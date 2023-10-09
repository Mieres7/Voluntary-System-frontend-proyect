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
    const colors = ref([
      "fire",
      "volcano",
      "house-crack",
      "rock-slide",
      "tsunami",
      "flood-water",
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
      colors,
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
      <div class="bot" :class="this.colors[task.clasification]">
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

<style scoped>
.fire {
  background-color: rgb(232, 123, 22); /* Naranja claro */
}
.volcano {
  background-color: rgb(138, 16, 24); /* Rojo oscuro */
}
.house-crack {
  background-color: rgb(22, 126, 22); /* Verde oscuro */
}
.rock-slide {
  background-color: rgb(105, 78, 24); /* Marrón oscuro */
}
.tsunami {
  background-color: rgb(0, 48, 99); /* Azul oscuro */
}
.flood-water {
  background-color: rgb(44, 77, 139); /* Azul más oscuro */
}

.task {
  display: grid;
  grid-area: "top" "bot";
  grid-template-columns: 100%;
  grid-template-rows: 25% 75%;
  width: 276px;
  height: 200px;
  border-radius: 16px;
  z-index: 0;
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: all ease 0.1s;
}
.task:hover {
  transform: translateY(2px) translateX(1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.top {
  background-color: #cecece;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  font-family: "Quicksand", sans-serif;
  font-size: 18px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
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
  cursor: pointer;
}

.bot {
  font-size: 17px;
  font-family: "Quicksand", sans-serif;
  font-weight: 400;
  padding: 5px;
  text-align: start;
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
  font-size: 140px;
  color: #e8e8e8;
  opacity: 0.3;
  margin-left: 5px;
}

.menu {
  display: none;
  width: 210px;
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
  background-color: #fff;
  z-index: 9999;
  font-family: "Quicksand", sans-serif;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu li {
  border-radius: 10px;
  padding: 8px 10px;
}
.menu a {
  text-decoration: none;
  color: #333;
  display: block;
}
.menu li:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
