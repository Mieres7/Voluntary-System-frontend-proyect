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

<style scoped>
.interactive-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 10% 90%;
  grid-template-areas:
    "eTitle tTitle vTitle"
    "emergencys task volunteers";
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 1.1rem;
  border-radius: 16px;
}

.eTitle {
  grid-area: eTitle;
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
  font-size: 150px;
  color: #e8e8e8;
  opacity: 1;
  margin-left: 5px;
}

.info {
  /* display: flex;
  justify-content: space-between; */
  padding: 10px;
  font-family: "Quicksand", sans-serif;
  margin: 5px;
  background-color: whitesmoke;
  border-radius: 10px;
  text-align: start;
  position: relative;
  overflow: hidden;
  height: 180px;
  transition: all ease 0.1s;
}

.info:hover {
  transform: translateY(1px);
  cursor: pointer;
}

#emergency {
  transition: all ease 0.1s;
}

.emergencys {
  grid-area: emergencys;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 25px 25px 25px;
}

.task {
  grid-area: task;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 25px 25px 25px;
}

.volunteers {
  grid-area: volunteers;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 25px 25px 25px;
}

.content {
  background-color: #cecece;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  overflow-y: auto;
}

.tTitle {
  grid-area: tTitle;
}
.task {
  grid-area: task;
}
.vTitle {
  grid-area: vTitle;
}
.volunteers {
  grid-area: volunteers;
}

.tTitle,
.vTitle,
.eTitle {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

h2 {
  all: initial;
  font-family: "Quicksand", sans-serif;
  font-size: 2rem;
}
</style>
