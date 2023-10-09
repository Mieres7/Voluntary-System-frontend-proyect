<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "AddTask",
  setup() {
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

      console.log(a);
      const emergency_id = emergency.value.split(" ")[1];

      const newTask = {
        task_name: this.task_name,
        emergency_id: emergency_id,
        requirements: temp,
        volunteers_required: this.volunteers_required,
        description: this.description_task,
      };

      console.log(newTask);
      try {
        const res = axios.post("http://localhost:8080/", newTask);
      } catch (error) {
        // console.log(error);
      }
    }

    return {
      showNewTask,
      close,
      newTask,
      emergencys,
      requirements,
      task_name,
      emergency,
      volunteers_required,
      requirementsSelected,
      description_task,
    };
  },
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

<style scoped>
.button {
  padding: 15px 50px;
  border: none;
  border-radius: 10px;
  margin-right: 20px;
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
  cursor: pointer;
}

.screen {
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

.new-task {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fff;
  font-family: "Quicksand", sans-serif;
  padding: 40px;
  z-index: 4;
  transition: all 0.5s ease;
  max-width: 589px;
}

.new-task > h2 {
  font-weight: 400;
  margin: 0;
  margin-bottom: 10px;
}

.new-task > button {
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  padding: 5px 10px;
  width: 90px;
  right: 100%;
  margin-top: 10px;
  margin-left: 254px;
  border-radius: 50px;
  background: #11303d;
  border: 1px solid #11303d;
  transition: background 0.5s ease;
}

.new-task > button:hover {
  cursor: pointer;
  color: #11303d;
  background: #fff;
}

#emergency,
#name,
#numbers,
#desc {
  resize: none;
  font-family: "Quicksand", sans-serif;
  border: none;
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(218, 218, 218);
}

#emergency > option {
  max-height: 36px;
  overflow-y: auto;
}

#emergency:hover {
  cursor: pointer;
}

.requirementsBox {
  background-color: rgb(218, 218, 218);
  max-height: 115px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  border-radius: 10px;
}

.requirements {
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 3px;
  margin-bottom: 5px;
}

.requirements:hover {
  background-color: rgb(151, 151, 151);
}
</style>
