<script>
import axios from "axios";
import { ref } from "vue";
import Warning from "./Warning.vue";
// import jwtDecode from "jwt-decode";
export default {
  name: "AddTask",
  emits: ["confirm"],
  setup(_, { emit }) {
    const d = document;
    const emergencys = ref([
        {
          emergnecy_name: "emergencia",
          emergency_id: "100",
        },
        {},
        {},
        {},
      ]),
      requirements = ref([
        {
          requirement_name: "requisito 1",
          requirement_id: "0",
        },
        {
          requirement_name: "requisito 2",
          requirement_id: "1",
        },
        {
          requirement_name: "requisito 3",
          requirement_id: "2",
        },
        {},
        {},
        {},
        {},
        {},
      ]);
    const task_name = ref(""),
      emergency = ref({}),
      requirementsSelected = ref([]),
      volunteers_required = ref(""),
      description_task = ref("");
    function showNewTask() {
      const $screen = d.querySelector(".screen"),
        $newtask = d.querySelector(".new-task");
      $screen.style.zIndex = "3";
      $newtask.style.opacity = "1";
    }
    function close() {
      const $screen = d.querySelector(".screen"),
        $newtask = d.querySelector(".new-task");
      $screen.style.zIndex = "-1";
      $newtask.style.opacity = "0";
    }

    function newTask() {
      const requirements = requirementsSelected.value;
      const temp = [];
      for (let i = 0; i < requirements.length; i++) {
        temp[i] = requirements[i];
      }

      const parts = emergency.value.split(": ");
      const emergency_id = parts[1].split(" - ")[0];
      console.log(emergency_id);

      const newTask = {
        task_name: this.task_name,
        emergency_id: emergency_id,
        requirements: temp,
        volunteers_required: this.volunteers_required,
        description: this.description_task,
      };

      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        task.value.id_user = decodedToken.id;
        axios
          .post("http://localhost:8080/task", newTask)
          .then(() => {
            // emit("confirm");

            close();
          })
          .catch((e) => {
            // error.value = "Error al crear la tarea: " + e.message;
            // setTimeout(() => {
            //   error.value = "";
            // }, 5000);
          });
      } else {
        error.value = "Token no encontrado. Por favor, autentíquese primero.";
        setTimeout(() => {
          error.value = "";
        }, 5000);
      }
    }
    const show = ref(false);

    function showError() {}

    return {
      showNewTask,
      close,
      newTask,
      show,
      emergencys,
      requirements,
      task_name,
      emergency,
      volunteers_required,
      requirementsSelected,
      description_task,
    };
  },
  components: { Warning },
};
</script>

<template>
  <button class="button" @click="showNewTask">Añadir Tarea</button>
  <div class="screen" @click="close">
    <Warning :showMessage="show" :warningNumber="number" />
    <div class="new-task" @click.stop>
      <h2>Nueva Tarea</h2>
      <p>Seleccione una emergencia</p>
      <select id="emergency" size="1" v-model="emergency">
        <option v-for="emergency in this.emergencys">
          ID: {{ emergency.emergency_id }} - {{ emergency.emergnecy_name }}
        </option>
      </select>
      <p>Nombre</p>
      <input type="text" id="name" v-model="task_name" />
      <p>Seleccione los requisitos nescesarios</p>
      <div class="requirementsBox">
        <div class="requirements" v-for="requirement in this.requirements">
          <label>{{ requirement.requirement_name }}</label>
          <input
            type="checkbox"
            :value="requirement.requirement_id"
            v-model="requirementsSelected"
          />
        </div>
      </div>
      <p>Ingresar cantidad de voluntarios requeridos</p>
      <input
        type="number"
        id="numbers"
        min="1"
        step="1"
        v-model="volunteers_required"
      />
      <p>Descripción</p>
      <textarea
        id="desc"
        resize="none"
        cols="30"
        rows="7"
        v-model="description_task"
      ></textarea>
      <button type="button" @click="newTask">Aceptar</button>
    </div>
  </div>
</template>
