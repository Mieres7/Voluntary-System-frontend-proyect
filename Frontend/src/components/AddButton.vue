<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AddButton",
});
</script>

<template>
  <button class="button">Añadir Tarea</button>
</template>

<style scoped>
.button {
  padding: 15px 50px;
  border: none;
  border-radius: 10px;
  margin-right: 20px;
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
  cursor: pointer;
  /* background-color: #cecece; */
}
</style>
