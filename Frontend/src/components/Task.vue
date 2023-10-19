<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "Task",
  components: {},
  emits: ["modifierSignal", "showInfo"],
  setup(_, { emit }) {
    const taskList = ref([
      {
        idT: "0",
        name: "Recoleccion de leña",
        description: "jsdlkfjasdlads;;;ldkfja;sdlkfjsd;lkfjsdkl;fjds;lkf",
        state: "done",
        idE: "1",
        volunteersR: "5",
        volunteersS: "2",
        clasification: "0",
      },
      { clasification: "1" },
      { clasification: "2" },
      { clasification: "3" },
      { clasification: "4" },
      { clasification: "5" },
      {},
      {},
      {},
      {},
    ]);
    const icons = ref([
      "fa-fire",
      "fa-volcano",
      "fa-house-crack",
      "fa-hill-rockslide",
      "fa-house-tsunami",
      "fa-house-flood-water",
    ]);

    const options = ref(["nombre", "descripción", "estado", "n° voluntarios"]);
    const iconsMenu = ref([
      "fa-pen-to-square",
      "fa-quote-left",
      "fa-check",
      "fa-user",
    ]);

    const selectedTask = ref(null);

    const getTaskByEmergencyId = () => {
      axios.get("ruta").then((res) => {
        this.taskList = res.data;
      });
    };
    getTaskByEmergencyId();

    const showMenu = (event, idTask) => {
      const d = document;
      const x = event.clientX;
      const y = event.clientY;
      const $menu = d.querySelector(".menu");

      $menu.style.display = "block";
      $menu.style.left = `${x}px`;
      $menu.style.top = `${y}px`;

      document.addEventListener("click", closeMenu);
      selectedTask.value = idTask;
    };
    const closeMenu = (event) => {
      if (!event) return;

      const menu = document.querySelector(".menu");

      menu.style.display = "none";
      document.removeEventListener("click", closeMenu);
    };

    const modifieProperties = (propertySelectedIndex) => {
      emit("modifierSignal", propertySelectedIndex);
    };

    const showInfoTask = (name, description, state, volunteersR) => {
      const info = {
        name: name,
        description: description,
        state: state,
        volunteersR: volunteersR,
      };
      emit("showInfo", info);
    };

    return {
      modifieProperties,
      showInfoTask,
      showMenu,
      closeMenu,
      taskList,
      selectedTask,
      icons,
      iconsMenu,
      options,
    };
  },
};
</script>

<template>
  <!-- // Poner el color de las task segun la emergencia  -->
  <div class="container" v-for="(task, index) in this.taskList" :key="index">
    <div
      class="task"
      @contextmenu.prevent="showMenu($event, task.idT)"
      @click.prevent="
        showInfoTask(task.name, task.description, task.state, task.volunteersR)
      "
    >
      <div class="top">{{ index }}. {{ task.name }}</div>
      <div class="bot">
        Estado: {{ task.state }} <br />{{ task.volunteersS }}/{{
          task.volunteersR
        }}
        <i class="fa-solid fa-user"></i> <br />

        ID: {{ task.idT }}

        <div class="icons">
          <i class="fa-solid icon" :class="this.icons[task.clasification]"> </i>
        </div>
      </div>
    </div>
  </div>
  <div class="menu">
    <ul>
      <li v-for="i in 4" @click.prevent="modifieProperties(i - 1)">
        <a href="#">
          <i class="fa-solid" :class="this.iconsMenu[i - 1]"></i>
          Cambiar
          {{ this.options[i - 1] }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
