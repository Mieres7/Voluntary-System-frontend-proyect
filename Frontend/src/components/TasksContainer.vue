<script>
import Task from "./Task.vue";
import AddTask from "../components/AddTask.vue";
import { ref } from "vue";
import Warning from "./Warning.vue";
import axios from "axios";
export default {
  name: "TasksContainer",
  components: { Task, AddTask, Warning },

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
      states = ref([
        "Inicializada",
        "En curso",
        "Finalizada",
        "inicializada",
        "en curso",
        "finalizada",
      ]), // MODIFICAR ESTADOS VALIDOS, PONER CON MAYUSCULAS TAMBIEN
      name = ref(""),
      description = ref(""),
      state = ref(""),
      volunteersR = ref(""),
      show = ref(false),
      taskSelectedId = ref(""),
      reloadTaskValue = ref(false);

    function modifier(info) {
      // console.log(info.id.value);
      propertySelectedIndex.value = info.index;
      taskSelectedId.value = info.id;

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

      const token = localStorage.getItem("token");
      if (token) {
        switch (selectedIndex) {
          case 0:
            // put de nombre
            axios
              .put(
                "api/task/updateTaskName/" +
                  taskSelectedId.value +
                  "/" +
                  modifiedValue.value
              )
              .then(() => {
                reloadTaskValue.value = true;
                close();
                setTimeout(() => {
                  reloadTaskValue.value = false;
                }, 3000);
              })
              .catch(() => {
                // error
              });
            close();
            break;
          case 1:
            // put de descripcion
            axios
              .put(
                "api/task/updateDescription/" +
                  taskSelectedId.value +
                  "/" +
                  modifiedValue.value
              )
              .then(() => {
                reloadTaskValue.value = true;
                close();
                setTimeout(() => {
                  reloadTaskValue.value = false;
                }, 3000);
              })
              .catch(() => {
                // error
              });
            close();
            break;
          case 2:
            // console.log(modifiedValue.value);
            if (states.value.includes(modifiedValue.value)) {
              axios
                .put(
                  "api/task/updateState/" +
                    taskSelectedId.value +
                    "/" +
                    modifiedValue.value
                )
                .then(() => {
                  reloadTaskValue.value = true;
                  close();
                  setTimeout(() => {
                    reloadTaskValue.value = false;
                  }, 3000);
                })
                .catch(() => {
                  // error
                });
              close();
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
              axios
                .put(
                  "api/task/updateVolunteers/" +
                    taskSelectedId.value +
                    "/" +
                    modifiedValue.value
                )
                .then(() => {
                  reloadTaskValue.value = true;
                  close();
                  setTimeout(() => {
                    reloadTaskValue.value = false;
                  }, 3000);
                })
                .catch(() => {
                  // error
                });
              close();
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
    }

    const showError = () => {
      show.value = true;
      setTimeout(() => {
        show.value = false;
      }, 2500);
    };

    function reloadTaskf() {
      reloadTaskValue.value = true;
      setTimeout(() => {
        reloadTaskValue.value = false;
      }, 3000);
    }

    return {
      modifier,
      close,
      updateTask,
      showTaskInfo,
      showError,
      reloadTaskf,
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
      show,
      taskSelectedId,
      reloadTaskValue,
    };
  },
};
</script>

<template>
  <div class="task-container">
    <Warning :showMessage="show" :warningNumber="'0'" />

    <div class="filters">
      <button class="button" @click="showError">Filtros</button>
      <AddTask @reloadTask="reloadTaskf" />
    </div>
    <div class="tasks">
      <Task
        @modifierSignal="modifier"
        @showInfo="showTaskInfo"
        :reloadTask="reloadTaskValue"
      />
    </div>

    <div class="overlay" @click="close">
      <div class="modifier" @click.stop>
        <!-- update tarea-->
        <span>Cambiar {{ this.options[this.propertySelectedIndex] }}</span>
        <input type="text" v-model="modifiedValue" />
        <button type="button" @click.prevent="updateTask()">Aceptar</button>
        <p v-if="alert">{{ alertOptions[this.propertySelectedIndex - 2] }}</p>
      </div>
      <div class="task-info" @click.stop>
        <!-- info tarea-->
        <h2>{{ this.name }}</h2>
        <p>Descripción: {{ this.description }}</p>
        <p>Estado: {{ this.state }}</p>
        <p>Voluntarios Requeridos: {{ this.volunteersR }}</p>
      </div>
    </div>
  </div>
</template>
