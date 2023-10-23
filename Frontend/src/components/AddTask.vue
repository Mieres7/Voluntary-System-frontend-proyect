<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import Warning from "./Warning.vue";

export default {
  name: "AddTask",
  emits: ["reloadTask"],
  setup(_, { emit }) {
    const d = document;
    const emergencys = ref([]);
    const task_name = ref(""),
      emergency = ref({}),
      requirementsSelected = ref([]),
      volunteers_required = ref(""),
      description_task = ref(""),
      requirements = ref([]);

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

      const newTask = {
        task_name: this.task_name,
        emergency_id: parseInt(emergency_id),
        requirements: temp,
        volunteers_required: this.volunteers_required,
        description: this.description_task,
      };

      const token = localStorage.getItem("token");
      if (token) {
        axios
          .post("api/emergency_task/specialPost", newTask)
          .then(() => {
            close();
            emit("reloadTask");
          })
          .catch(() => {
            // console.log("Error");
            close();
          });
      } else {
        close();
      }
    }

    function getEmergencys() {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("api/emergency/get_state_names")
          .then((res) => {
            emergencys.value = res.data;
          })
          .catch((e) => {
            console.log(e);
          }); //error
      }
    }

    function getRequirements() {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("/api/request/get_request_names")
          .then((res) => {
            requirements.value = res.data;
          })
          .catch((e) => {
            console.log(e);
          }); //error
      }
    }
    onMounted(() => {
      getEmergencys();
      getRequirements();
    });

    return {
      showNewTask,
      close,
      newTask,
      getRequirements,
      getEmergencys,
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
    <div class="new-task" @click.stop>
      <h2>Nueva Tarea</h2>
      <p>Seleccione una emergencia</p>
      <select id="emergency" size="1" v-model="emergency">
        <option v-for="emergency in this.emergencys">
          ID: {{ emergency.id_emergency }} - {{ emergency.emergency_name }}
        </option>
      </select>
      <p>Nombre</p>
      <input type="text" id="name" v-model="task_name" />
      <p>Seleccione los requisitos nescesarios</p>
      <div class="requirementsBox">
        <div class="requirements" v-for="requirement in this.requirements">
          <label>{{ requirement.request_name }}</label>
          <input
            type="checkbox"
            :value="requirement.id_request"
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
