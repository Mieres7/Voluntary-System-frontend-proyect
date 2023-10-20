<script>
import { ref } from "vue";
import Task from "./Task.vue";
export default {
  name: "InteractiveContainer",
  components: { Task },
  setup() {
    const emergencys = ref([]),
      task = ref([]),
      volunteers = ref([]);
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
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      if (token) {
        axios
          .get("http://localhost:8080/task/get_s/" + emergencyId)
          .then((res) => {
            task.value = res.data;
          })
          .catch();
      }
    }

    function getEmergencys() {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      if (token) {
        axios
          .get("http://localhost:8080/emergency/get_state_names")
          .then((res) => {
            emergencys.value = res.data;
          })
          .catch();
      }
    }

    return {
      getTaskByEmergency,
      getEmergencys,
      emergencys,
      task,
      volunteers,
      icons,
      colors,
    };
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
          @click="getTaskByEmergency(i.id_emergency)"
        >
          <p>{{ i.emergency_name }}</p>
          <p>ID: {{ i.id_emergency }}</p>
          <p>Estado: {{ i.state_name }}</p>
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
          <p>ID: {{ t.id_task }}</p>
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
