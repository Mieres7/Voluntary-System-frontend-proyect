<script>
import { defineComponent } from "vue";
import Task from "./Task.vue";
export default defineComponent({
  name: "TasksContainer",
  components: { Task },
});
</script>

<template>
  <div class="task-container">
    <div class="filters">tareas</div>
    <div class="tasks">
      <Task v-for="i in 25" />
    </div>
  </div>
</template>

<style scoped>
/* .task-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  border-radius: 16px;
  box-shadow: 0 5px 7px rgba(225, 220, 220, 0.1);
  height: 100%;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  z-index: 0;
  background: #246682;
} */

.task-container {
  display: grid;
  grid-template-rows: 5% 95%;
  grid-template-columns: 100%;
  grid-template-areas:
    "filters"
    "tasks";
  height: 100%;
  width: 100%;
  background: #246682;
  background: #3599c3;
  background: #fff;
  /* background: #407890; */
  z-index: 0;
  /* border-radius: 16px; */
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  /* box-shadow: 0 5px 7px rgba(225, 220, 220, 0.1); */
  border: 1px solid #fff;
}

.filters {
  grid-area: filters;
  display: flex;
  align-items: center;
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
</style>
