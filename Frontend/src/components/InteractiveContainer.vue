<script>
import { ref } from "vue";
import Task from "./Task.vue";
export default {
  name: "InteractiveContainer",
  components: { Task },
  setup() {
    const emergencys = ref([
        {
          emergency_name: "Emergencia estatal de santiago de chile",
          emergency_id: "0",
          emergency_state: "En proceso",
          emergency_type: "0",
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]),
      task = ref([]),
      volunteers = ref([
        {
          rut: "12.345.678-9",
          volunteer_name: "Pedro",
          flag: true,
        },
        {
          rut: "09.876.543-2",
          volunteer_name: "Matias",
          flag: false,
        },
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
      ]),
      colors = ref([
        "fire",
        "volcano",
        "house-crack",
        "rock-slide",
        "tsunami",
        "flood-water",
      ]);

    function getTaskByEmergency(emergencyId) {
      console.log(emergencyId);
      this.task.push({
        task_id: "0",
        task_name: "Regoger piedras",
        volunteers_requiered: "20",
        state_name: "done",
        emergency_type: "0",
      });
    }

    return { getTaskByEmergency, emergencys, task, volunteers, icons, colors };
  },
};
</script>

<template>
  <div class="interactive-container">
    <div class="eTitle">
      <h2>Emergencias</h2>
    </div>
    <div class="emergencys">
      <div class="content">
        <div
          class="info"
          id="emergency-int"
          v-for="i in emergencys"
          @click="getTaskByEmergency(i.emergency_id)"
        >
          <p>{{ i.emergency_name }}</p>
          <p>ID: {{ i.emergency_id }}</p>
          <p>Estado: {{ i.emergency_state }}</p>
          <div class="icons-int">
            <i
              class="fa-solid icon-int"
              :class="this.icons[i.emergency_type]"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="tTitle">
      <h2>Tareas</h2>
    </div>
    <div class="task-int">
      <div class="content">
        <div class="info" v-for="t in task">
          <p>{{ t.task_name }}</p>
          <p>ID: {{ t.task_id }}</p>
          <P>Estado: {{ t.state_name }}</P>
          <p>Voluntarios: {{ t.volunteers_requiered }}</p>
          <div class="icons-int">
            <i
              class="fa-solid icon-int"
              :class="this.icons[t.emergency_type]"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="vTitle">
      <h2>Voluntarios</h2>
    </div>
    <div class="volunteers">
      <div class="content">
        <div class="info" v-for="v in volunteers">
          <p>{{ v.volunteer_name }}</p>
          <p>RUT: {{ v.rut }}</p>
          <P v-if="v.flag">Participa</P>
          <p v-if="!v.flag">No participa</p>
        </div>
      </div>
    </div>
  </div>
</template>
