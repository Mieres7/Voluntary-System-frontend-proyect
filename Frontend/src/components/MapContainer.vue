<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { onMounted, ref } from "vue";
export default {
  name: "MapContainer",
  setup() {
    const emergencys = ref([
        // {
        //   emergency_name: "nombreDeEjemplo",
        //   id_emergency: "20",
        //   longitude: -38.57434144039071,
        //   latitude: -72.4756987329032,
        // },
        // {},
        // {},
        // {},
        // {},
      ]),
      volunteers = ref([
        // {
        //   first_name: "Pedro",
        //   first_lastname: "Herrera",
        //   longitude: -32.993457378637764,
        //   latitude: -71.53361941561872,
        // },
        // {
        //   first_name: "Juan",
        //   first_lastname: "Salazar",
        //   longitude: -39.41955618986563,
        //   latitude: -71.93942618853083,
        // },
      ]),
      options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
      map = ref(),
      markers = ref([]),
      location = ref(null);

    const initMap = () => {
      map.value = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [location.value.lng, location.value.lat], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

      const popup = new mapboxgl.Popup()
        .setLngLat([location.value.lng, location.value.lat])
        .setHTML(`<h4> Usted está aqui <h4>`);

      new mapboxgl.Marker()
        .setLngLat([location.value.lng, location.value.lat])
        .setPopup(popup)
        .addTo(map.value);

      return map;
    };

    const getLocation = async () => {
      try {
        location.value = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              reject(error);
            },
            options
          );
        });
      } catch (error) {
        console.error("Error al detectar posición actual");
      }
    };

    async function getVolunteers(index) {
      if (markers) {
        markers.value.forEach((marker) => {
          marker.remove();
        });
        markers.value = [];
      }

      const token = localStorage.getItem("token");
      if (token) {
        await axios
          .get("api/getVolunteers/" + emergencys.value[index].id_emergency)
          .then((res) => {
            volunteers.value = res.data;
          })
          .catch((e) => {
            console.log(e);
          });
      }

      volunteers.value.forEach((vol) => {
        const popup = new mapboxgl.Popup()
          .setLngLat([vol.latitude, vol.longitude])
          .setHTML(
            `<h4>Voluntario: ${vol.first_name} ${vol.first_lastname} <h4>`
          );

        const marker = new mapboxgl.Marker({ color: "#ff8300" })
          .setLngLat([vol.latitude, vol.longitude])
          .setPopup(popup)
          .addTo(map.value);

        markers.value.push(marker);
      });

      const popupE = new mapboxgl.Popup()
        .setLngLat([
          emergencys.value[index].latitude,
          emergencys.value[index].longitude,
        ])
        .setHTML(
          `<h4>Emergencia: ${emergencys.value[index].emergency_name} <h4>`
        );

      const markerE = new mapboxgl.Marker({ color: "#ff0020" })
        .setLngLat([
          emergencys.value[index].latitude,
          emergencys.value[index].longitude,
        ])
        .setPopup(popupE)
        .addTo(map.value);

      markers.value.push(markerE);
    }

    const getEmergencys = () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // axios.defaults.headers.common["Authorization"] =
          //   "Bearer " + localStorage.getItem("token");
          axios
            .get("api/emergency/getEmergenciesAddresses")
            .then((res) => {
              emergencys.value = res.data;
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      await getLocation();
      getEmergencys();
      initMap();
    });

    return {
      initMap,
      getLocation,
      getVolunteers,
      getEmergencys,
      markers,
      map,
      location,
      emergencys,
      options,
    };
  },
};
</script>

<template>
  <div class="map-container">
    <div class="filters">
      <label for="emergencySelect" class="emergencyLabel"
        >Seleccione una emergencia:
      </label>
      <select class="button-select" id="emergencySelect">
        <option
          v-for="(e, index) in this.emergencys"
          :key="index"
          :value="e.id_emergency"
          @click="getVolunteers(index)"
        >
          {{ index }}. {{ e.emergency_name }}
        </option>
      </select>
    </div>
    <div id="map"></div>
  </div>
</template>
