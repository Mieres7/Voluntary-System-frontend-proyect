<script>
import { defineComponent } from "vue";
import Task from "./Task.vue";
import AddButton from "../components/AddButton.vue";
export default defineComponent({
  name: "TasksContainer",
  components: { Task, AddButton },
});
</script>

<template>
  <div class="task-container">
    <div class="filters">
      Filtros
      <AddButton />
    </div>
    <div class="tasks">
      <Task />
    </div>
  </div>
</template>

<style scoped>
.task-container {
  display: grid;
  grid-template-rows: 10% 90%;
  grid-template-columns: 100%;
  grid-template-areas:
    "filters"
    "tasks";
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 0;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border: 1px solid #fff;
}
.filters {
  grid-area: filters;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
}
.tasks {
  grid-area: tasks;
  background: #3599c3;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: row;
  overflow: scroll;
  overflow-x: hidden;
  border-bottom-left-radius: 16px;
}

/* boton */
</style>
