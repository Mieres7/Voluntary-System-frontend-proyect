<script>
import { reactive, ref } from "vue";
export default {
  name: "MapContainer",
  setup() {
    const emergencys = reactive([
      { emergency_name: "nombreDeEjemplo" },
      {},
      {},
      {},
      {},
    ]);

    const emergency = ref(null);

    return { emergencys, emergency };
  },
};
</script>
<template>
  <div class="map-container">
    <div class="filters">
      <label for="emergencySelect" class="emergencyLabel"
        >Seleccione una emergencia:</label
      >
      <select v-model="emergency" class="button-select" id="emergencySelect">
        <option v-for="(e, index) in this.emergencys" :key="index">
          {{ index }}. {{ e.emergency_name }}
        </option>
      </select>
    </div>
    <div class="map"></div>
  </div>
</template>
