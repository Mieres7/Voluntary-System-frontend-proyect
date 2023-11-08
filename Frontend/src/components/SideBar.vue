<script>
import { ref } from "vue";
import Warning from "./Warning.vue";
import { useRouter } from "vue-router";
export default {
  name: "SideBar",
  components: { Warning },
  setup() {
    const show = ref(false);
    const router = useRouter();
    function showError() {
      show.value = true;
      setTimeout(() => {
        show.value = false;
      }, 2500);
    }

    function gotoTask() {
      router.push("/task");
    }

    function gotoInteractive() {
      router.push("/interactive");
    }
    return { showError, gotoTask, gotoInteractive, show };
  },
};
</script>

<template>
  <Warning :showMessage="show" :warningNumber="'0'" />
  <div id="nav-bar">
    <input id="nav-toggle" type="checkbox" />
    <div id="nav-header">
      <a id="nav-title"> UNITY RESCUE </a>
      <label for="nav-toggle">
        <span id="nav-toggle-burger"></span>
      </label>
      <hr />
    </div>
    <div id="nav-content">
      <div class="nav-button btn" @click="showError">
        <i class="fas fa-regular fa-triangle-exclamation"></i
        ><span>Emergencias</span>
      </div>
      <div class="nav-button" @click="gotoTask">
        <i class="fas fa-solid fa-list-check"></i><span>Tareas</span>
      </div>
      <div class="nav-button btn" @click="showError">
        <i class="fas fa-chart-line"></i><span>Ranking</span>
      </div>

      <div class="nav-button btn" @click="showError">
        <i class="fas fa-solid fa-user-plus"></i
        ><span>Registro Voluntarios</span>
      </div>
      <div class="nav-button btn" @click="showError">
        <i class="fas fa-regular fa-clipboard"></i><span>Mis Tareas</span>
      </div>
      <div class="nav-button" @click="gotoInteractive">
        <i class="fas fa-fire"></i><span>Vista Interativa</span>
      </div>
      <div class="nav-button" @click="">
        <i class="fas fa-solid fa-map-location-dot"></i
        ><span>Mapa Emergencias</span>
      </div>
      <div id="nav-content-highlight"></div>
    </div>
  </div>
</template>
