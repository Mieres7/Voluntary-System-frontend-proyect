<script>
import axios from "axios";
import { ref, onMounted, watch } from "vue";

export default {
  name: "Task",
  components: {},
  emits: ["modifierSignal", "showInfo"],
  props: {
    reloadTask: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const taskList = ref([]);
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

    const getTask = () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      if (token) {
        axios
          .get("http://localhost:8080/ranking/tasks_information")
          .then((res) => {
            taskList.value = res.data;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

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
      const info = {
        index: propertySelectedIndex,
        id: selectedTask.value,
      };

      emit("modifierSignal", info);
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

    onMounted(() => {
      getTask();
    });

    watch(
      () => props.reloadTask,
      (newVal) => {
        if (newVal) {
          getTask();
        }
      }
    );

    return {
      modifieProperties,
      showInfoTask,
      showMenu,
      closeMenu,
      getTask,
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
      @contextmenu.prevent="showMenu($event, task.id_task)"
      @click.prevent="
        showInfoTask(
          task.task_name,
          task.task_description,
          task.state_name,
          task.volunteers_required
        )
      "
    >
      <div class="top">{{ index + 1 }}. {{ task.task_name }}</div>
      <div class="bot">
        Estado: {{ task.state_name }} <br />
        <i class="fa-solid fa-user"></i> {{ task.volunteers_required }}<br />

        ID: {{ task.id_task }}

        <div class="icons">
          <i class="fa-solid icon" :class="this.icons[task.emergency_type]">
          </i>
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
