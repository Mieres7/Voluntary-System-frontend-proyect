<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Task",
  data() {
    return {
      taskList: [
        {
          idT: "0",
          name: "Apaleamiento de ripio",
          estate: "done",
          idE: "1",
          volunteersR: "5",
          volunteersS: "2",
          clasification: "0",
        },
      ],
      icons: [
        "fa-fire",
        "fa-volcano",
        "fa-house-crack",
        "fa-hill-rockslide",
        "fa-house-tsunami",
        "fa-house-flood-water",
      ],
    };
  },
  methods: {
    // MODIFICAR RUTA
    getTaskByEmergencyId() {
      axios.get("ruta").then((res) => {
        this.taskList = res.data;
      });
    },
  },
  created() {
    this.getTaskByEmergencyId();
  },
});
</script>

<template>
  <div class="task" v-for="(task, index) in this.taskList" :key="index">
    <div class="top">
      {{ task.name }}
      <button @click="">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
    </div>
    <div class="bot">
      <p>ID: {{ task.idT }}</p>

      {{ task.volunteersS }}/{{ task.volunteersR }}
      <i class="fa-solid fa-user"></i>

      <p>status: {{ task.estate }}</p>

      <div class="icons">
        <i class="fa-solid icon" :class="this.icons[task.clasification]"> </i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task {
  display: grid;
  grid-area: "top" "bot";
  grid-template-columns: 100%;
  grid-template-rows: 30% 70%;
  width: 276px;
  height: 200px;
  background-color: #cecece;
  border-radius: 16px;
  z-index: 0;
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}

.top {
  background-color: rgb(252, 132, 33);
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  font-family: "Quicksand", sans-serif;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 10px;
}

.top > button {
  border: 0;
  background: none;
  font-size: 15px;
}

.top > button:hover {
  transform: translateY(1px);
}

.bot {
  font-size: 1.1rem;
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  padding: 5px;
}

.icons {
  display: flex;
  align-items: end;
  justify-content: end;
}

.icon {
  position: absolute;
  right: -20px;
  bottom: -20px;
  font-size: 150px;
  color: #e8e8e8;
  z-index: -1;
  /* transform: rotateY(45deg) rotateZ(10deg); */
}
</style>
