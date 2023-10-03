<script>
import axios from "axios";
import { defineComponent } from "vue";
import EditTask from "./EditTask.vue";

export default defineComponent({
  name: "Task",
  data() {
    return {
      taskList: [
        {
          idT: "0",
          name: "Recoleccion de leña",
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
      options: ["nombre", "descripción", "estado", "n° voluntarios"],
      iconsMenu: ["fa-pen-to-square", "fa-quote-left", "fa-check", "fa-user"],
      selectedTask: null,
    };
  },
  methods: {
    // MODIFICAR RUTA - metodo para mostrar las tareas por pantalla
    getTaskByEmergencyId() {
      axios.get("ruta").then((res) => {
        this.taskList = res.data;
      });
    },

    showMenu(event, idTask) {
      const d = document;
      this.$nextTick(() => {
        const x = event.clientX,
          y = event.clientY,
          menu = d.querySelector(".menu");

        menu.style.display = "block";
        menu.style.left = x + "px";
        menu.style.top = y + "px";

        document.addEventListener("click", this.closeMenu);
        this.selectedTask = idTask; // idTask es string
      });
    },

    closeMenu(event) {
      const menu = document.querySelector(".menu");
      if (!menu.contains(event.target)) {
        menu.style.display = "none";
        document.removeEventListener("click", this.closeMenu);
      }
    },
    hola() {
      console.log(this.selectedTask);
    },
  },
  created() {
    this.getTaskByEmergencyId();
  },
  components: { EditTask },
});
</script>

<template>
  <div class="container" v-for="(task, index) in this.taskList" :key="index">
    <div class="task" @contextmenu.prevent="showMenu($event, task.idT)">
      <div class="top">{{ index }}. {{ task.name }}</div>
      <div class="bot">
        Status: {{ task.estate }} <br />{{ task.volunteersS }}/{{
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
      <li v-for="i in 4">
        <a href="#" @click="hola">
          <i class="fa-solid" :class="this.iconsMenu[i - 1]"></i> Cambiar
          {{ this.options[i - 1] }}
        </a>
      </li>
    </ul>
  </div>
  <!-- <TaskMenu :selectedTask="this.selectedTask" /> -->
</template>

<style scoped>
.task {
  display: grid;
  grid-area: "top" "bot";
  grid-template-columns: 100%;
  grid-template-rows: 25% 75%;
  width: 276px;
  height: 200px;
  background-color: rgb(252, 132, 33);
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
  /* z-index: -999; */
  opacity: 0.3;
  margin-left: 5px;
  /* transform: rotateY(45deg) rotateZ(10deg); */
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
}
</style>
