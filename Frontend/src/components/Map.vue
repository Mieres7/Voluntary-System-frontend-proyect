<script>
import mapboxgl from "mapbox-gl";
import { onMounted, ref } from "vue";

export default {
  name: "Map",
  setup() {
    const initMap = () => {
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [-70.682766, -33.448942], // starting position [lng, lat]
        zoom: 15, // starting zoom
      });

      return map;
    };
    const location = ref({
      lat: null,
      lng: null,
    });
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            location.value.lat = position.coords.latitude;
            location.value.lng = position.coords.longitude;
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.log("Geolocalización no está disponible en tu navegador.");
      }
    };

    onMounted(() => {
      initMap();
      getLocation();
    });

    return { initMap, getLocation, location };
  },
};
</script>

<template></template>
