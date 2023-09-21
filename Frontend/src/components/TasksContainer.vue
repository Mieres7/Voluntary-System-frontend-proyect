<script>
import { defineComponent } from "vue";
import Task from "./Task.vue";
export default defineComponent({
  name: "TasksContainer",
  components: { Task },
});
</script>

<template>
  <div class="card">
    <Task v-for="i in 20" />
  </div>
</template>

<style scoped>
.card {
  border-radius: 16px;
  box-shadow: 0 5px 7px rgba(225, 220, 220, 0.1);
  height: 100%;
  width: 100%;
  /* transform: translateX(-10px); */
  /* transform: translateX(-27px); */
  /* para esta opcion considerar porner cosas en la barra de la dercha que queda disponible */
  z-index: 0;
  background-color: rgb(188, 209, 209);
  background-color: rgb(255, 255, 255);

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
  /* gap: 30px; */
  align-items: center;
  justify-content: center;
  /* padding: 10px; */
}
</style>
