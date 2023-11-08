<script>
import Mapboxgl from "mapbox-gl";

export default {
  name: "Map",
  setup() {
    const initMap = () => {
      const map = new Mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
    };

    return { initMap, map };
  },
};
</script>

<template></template>
