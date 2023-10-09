<script>
import Task from "./Task.vue";
import AddTask from "../components/AddTask.vue";
import { ref } from "vue";

export default {
  name: "TasksContainer",
  components: { Task, AddTask },
  setup() {
    const d = document,
      propertySelectedIndex = ref(""),
      modifiedValue = ref(""),
      options = ref(["nombre", "descripción", "estado", "n° voluntarios"]),
      alert = ref(false),
      alertOptions = ref([
        "Porfavor ingresa un estado válido",
        "Profavor ingresa una cantidad valida",
      ]),
      states = ref(["aa", "bb", "cc"]), // MODIFICAR ESTADOS VALIDOS, PONER CON MAYUSCULAS TAMBIEN
      name = ref(""),
      description = ref(""),
      state = ref(""),
      volunteersR = ref("");

    function modifier(value) {
      propertySelectedIndex.value = value;

      const $modifier = d.querySelector(".modifier"),
        $overlay = d.querySelector(".overlay"),
        $info = d.querySelector(".task-info");

      $info.style.opacity = "0";
      $overlay.style.zIndex = "3";
      $modifier.style.opacity = "1";
    }

    function showTaskInfo(value) {
      name.value = value.name;
      description.value = value.description;
      state.value = value.state;
      volunteersR.value = value.volunteersR;

      const $info = d.querySelector(".task-info"),
        $overlay = d.querySelector(".overlay"),
        $modifier = d.querySelector(".modifier");

      $modifier.style.opacity = "0";
      $overlay.style.zIndex = "3";
      $info.style.opacity = "1";
    }

    function close() {
      const $modifier = d.querySelector(".modifier"),
        $overlay = d.querySelector(".overlay"),
        $info = d.querySelector(".task-info");

      $overlay.style.zIndex = "-1";
      $modifier.style.opacity = "0";
      $info.style.opacity = "0";
    }

    function updateTask() {
      const selectedIndex = parseInt(propertySelectedIndex.value);
      switch (selectedIndex) {
        case 0:
          // put de nombre
          closeModifier();
          break;
        case 1:
          // put de descripcion
          closeModifier();
          break;
        case 2:
          if (states.value.includes(modifiedValue)) {
            // ruta put
            closeModifier();
          } else {
            alert.value = true;
            setTimeout(() => {
              alert.value = false;
            }, 3000);
          }
          break;
        case 3:
          const volunteers = parseInt(modifiedValue.value);
          if (!isNaN(volunteers)) {
            // ruta put
            closeModifier();
          } else {
            alert.value = true;
            setTimeout(() => {
              alert.value = false;
            }, 3000);
          }
          break;
        default:
          break;
      }
    }

    return {
      modifier,
      close,
      updateTask,
      showTaskInfo,
      options,
      propertySelectedIndex,
      modifiedValue,
      alert,
      alertOptions,
      states,
      name,
      description,
      state,
      volunteersR,
    };
  },
};
</script>

<template>
  <div class="task-container">
    <div class="filters">
      Filtros
      <AddTask />
    </div>
    <div class="tasks">
      <Task @modifierSignal="modifier" @showInfo="showTaskInfo" />
    </div>

    <div class="overlay" @click="close">
      <div class="modifier" @click.stop>
        <span>Cambiar {{ this.options[this.propertySelectedIndex] }}</span>
        <input type="text" v-model="modifiedValue" />
        <button type="button" @click="updateTask()">Aceptar</button>
        <p v-if="alert">{{ alertOptions[this.propertySelectedIndex - 2] }}</p>
      </div>
      <div class="task-info" @click.stop>
        <h2>{{ this.name }}</h2>
        <p>Descripción: {{ this.description }}</p>
        <p>Estado: {{ this.state }}</p>
        <p>Voluntarios Requeridos: {{ this.volunteersR }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  transition: zIndex 0.3s ease;
}

.modifier {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 170px;
  display: flex;
  padding: 25px;
  font-size: 20px;
  font-weight: 500;
  background-color: #fff;
  font-family: "Quicksand", sans-serif;
  border-radius: 10px;
  z-index: 4;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modifier > span {
  margin: 10px;
}

.modifier > input {
  padding: 10px;
  margin: 10px;
  font-size: 15px;
  font-family: "Quicksand", sans-serif;
}

.modifier > button {
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  padding: 5px 10px;
  width: 90px;
  right: 100%;
  margin: 10px;
  margin-left: 200px;
  border-radius: 50px;
  background: #11303d;
  border: 1px solid #11303d;
  transition: background 0.5s ease;
}

.modifier > button:hover {
  cursor: pointer;
  color: #11303d;
  background: #fff;
}

.modifier > p {
  font-size: 12px;
  text-align: center;
  margin: 0;
  opacity: 1;
  color: red;
}

.task-info {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 15px;
  background-color: grey;
  max-width: 670px;
  font-family: "Quicksand", sans-serif;
  word-break: break-all;
  border-radius: 20px;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: #fff;
  color: #11303d;
}

.task-info > h2 {
  font-weight: 400;
}

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
  z-index: 1.1;
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
</style>
