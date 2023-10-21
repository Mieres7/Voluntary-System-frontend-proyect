<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  name: "InteractiveContainer",
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
      ]),
      pIcons = ref(["fa-x", "fa-check"]);

    function getTaskByEmergency(emergencyId) {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("api/task/get_s/" + emergencyId)
          .then((res) => {
            task.value = res.data;
          })
          .catch((e) => {
            console.log(e);
          });
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
          });
      }
    }

    function getVolunteers(taskId) {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("api/users_task_participation/" + taskId)
          .then((res) => {
            volunteers.value = res.data;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }

    onMounted(() => {
      getEmergencys();
    });

    return {
      getTaskByEmergency,
      getEmergencys,
      getVolunteers,
      emergencys,
      task,
      volunteers,
      icons,
      colors,
      pIcons,
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
        <div class="info" v-for="t in task" @click="getVolunteers(t.id_task)">
          <p>{{ t.task_name }}</p>
          <p>ID: {{ t.id_task }}</p>
          <p>Estado: {{ t.state_name }}</p>
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
          <p>{{ v.first_name }} {{ v.last_name }}</p>
          <p>RUT: {{ v.rut }}</p>
          <p v-if="v.participation == 1">Participa</p>
          <p v-else>No participa</p>
          <i
            class="fa-solid icon-int"
            :class="this.pIcons[v.participation]"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
