<script>
export default {
  name: "SideBar",
  components: {},
  setup() {
    const progress = () => {
      const d = document;
      const $snackbar = d.querySelector(".snackbar"),
        $progress = d.querySelector(".progress"),
        $buttons = d.querySelectorAll(".btn");

      $buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          $snackbar.classList.add("active");
          $progress.classList.add("active");

          setTimeout(() => {
            $snackbar.classList.remove("active");
            $progress.classList.remove("active");
          }, 2500);
        });
      });
    };
    return { progress };
  },
};
</script>

<template>
  <div class="snackbar">
    <div class="progress"></div>
    ¡Esta función aún está en desarrollo!
  </div>
  <div id="nav-bar">
    <input id="nav-toggle" type="checkbox" />
    <div id="nav-header">
      <a id="nav-title" href="https://codepen.io" target="_blank">
        C <i class="fab fa-codepen"></i>DEPEN
      </a>
      <label for="nav-toggle">
        <span id="nav-toggle-burger"></span>
      </label>
      <hr />
    </div>
    <div id="nav-content">
      <div class="nav-button btn" @click="progress">
        <i class="fas fa-regular fa-triangle-exclamation"></i
        ><span>Emergencias</span>
      </div>
      <div class="nav-button">
        <i class="fas fa-solid fa-list-check"></i><span>Tareas</span>
      </div>
      <div class="nav-button btn" @click="progress">
        <i class="fas fa-chart-line"></i><span>Ranking</span>
      </div>

      <div class="nav-button btn" @click="progress">
        <i class="fas fa-solid fa-user-plus"></i
        ><span>Registro Voluntarios</span>
      </div>
      <div class="nav-button btn" @click="progress">
        <i class="fas fa-regular fa-clipboard"></i><span>Mis Tareas</span>
      </div>
      <div class="nav-button">
        <i class="fas fa-fire"></i><span>Vista Interativa</span>
      </div>
      <div id="nav-content-highlight"></div>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  background: #9c88ff;
}

#nav-toggle:checked ~ #nav-header {
  width: calc(80px - 16px);
}
#nav-toggle:checked ~ #nav-content,
#nav-toggle:checked ~ #nav-footer {
  width: 80px;
}
#nav-toggle:checked ~ #nav-header #nav-title {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s;
}
#nav-toggle:checked ~ #nav-header label[for="nav-toggle"] {
  left: calc(50% - 8px);
  transform: translate(-50%);
}
#nav-toggle:checked ~ #nav-header #nav-toggle-burger {
  background: #f5f6fa;
  background: black;
}
#nav-toggle:checked ~ #nav-header #nav-toggle-burger:before,
#nav-toggle:checked ~ #nav-header #nav-toggle-burger::after {
  width: 16px;
  background: #212223;
  transform: translate(0, 0) rotate(0deg);
}

#nav-toggle:checked ~ #nav-content .nav-button span {
  opacity: 0;
  transition: opacity 0.1s;
}
#nav-toggle:checked ~ #nav-content .nav-button .fas {
  min-width: calc(100% - 16px);
}

#nav-bar {
  position: absolute;
  height: 87.9%;
  left: 20px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  overflow: hidden;
  user-select: none;
  z-index: 2;
  transform: translateY(1px);
}
#nav-bar hr {
  margin: 0;
  position: relative;
  left: 10px;
  width: calc(100% - 32px);
  border: none;
  border-top: solid 1px #2c3e50;
}
#nav-bar a {
  color: inherit;
  text-decoration: inherit;
}
#nav-bar p {
  color: inherit;
  text-decoration: inherit;
}
#nav-bar input[type="checkbox"] {
  display: none;
}

#nav-header {
  position: relative;
  width: 256px;
  left: 16px;
  width: calc(256px - 16px);
  min-height: 80px;
  color: #212223;
  border-radius: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  transition: width 0.2s;
}
#nav-header hr {
  position: absolute;
  bottom: 0;
}

#nav-title {
  font-size: 1.5rem;
  transition: opacity 1s;
}

label[for="nav-toggle"] {
  position: absolute;
  right: 0;
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#nav-toggle-burger {
  position: relative;
  width: 16px;
  height: 2px;
  border-radius: 99px;
  transition: background 0.2s;
}
#nav-toggle-burger:before,
#nav-toggle-burger:after {
  content: "";
  position: absolute;
  top: -6px;
  width: 10px;
  height: 2px;
  background: #11303d;
  border-radius: 99px;
  transform: translate(2px, 8px) rotate(30deg);
  transition: 0.2s;
}
#nav-toggle-burger:after {
  top: 6px;
  transform: translate(2px, -8px) rotate(-30deg);
}

#nav-content {
  margin: -16px 0;
  padding: 16px 0;
  position: relative;
  flex: 1;
  width: 256px;
  direction: rtl;
  overflow-x: hidden;
  transition: width 0.2s;
}
#nav-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
#nav-content::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background-color: #d62929;
}

#nav-content-highlight {
  position: absolute;
  right: 16px;
  top: -70px;
  width: calc(100% - 16px);
  height: 54px;

  background: #11303d;
  background-attachment: fixed;
  border-radius: 0 16px 16px 0;
  transition: top 0.2s;
}
#nav-content-highlight:before,
#nav-content-highlight:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: -16px 16px #11303d;
}
#nav-content-highlight:after {
  top: 100%;
  box-shadow: -16px -16px #11303d;
}

.nav-button {
  position: relative;
  margin-left: 16px;
  height: 54px;
  display: flex;
  align-items: center;
  color: #3c3e3f;
  /* color: #11303d;
  color: black; */
  direction: ltr;
  cursor: pointer;
  z-index: 1;
  transition: color 0.2s;
}
.nav-button span {
  transition: opacity 1s;
}
.nav-button .fas {
  transition: min-width 0.2s;
}
.nav-button:nth-of-type(1):hover {
  color: #fff;
}
.nav-button:nth-of-type(1):hover ~ #nav-content-highlight {
  top: 16px;
}
.nav-button:nth-of-type(2):hover {
  color: #fff;
}
.nav-button:nth-of-type(2):hover ~ #nav-content-highlight {
  top: 70px;
}
.nav-button:nth-of-type(3):hover {
  color: #fff;
}
.nav-button:nth-of-type(3):hover ~ #nav-content-highlight {
  top: 124px;
}
.nav-button:nth-of-type(4):hover {
  color: #fff;
}
.nav-button:nth-of-type(4):hover ~ #nav-content-highlight {
  top: 178px;
}
.nav-button:nth-of-type(5):hover {
  color: #fff;
}
.nav-button:nth-of-type(5):hover ~ #nav-content-highlight {
  top: 232px;
}
.nav-button:nth-of-type(6):hover {
  color: #fff;
}
.nav-button:nth-of-type(6):hover ~ #nav-content-highlight {
  top: 286px;
}
.nav-button:nth-of-type(7):hover {
  color: #fff;
}
.nav-button:nth-of-type(7):hover ~ #nav-content-highlight {
  top: 340px;
}
.nav-button:nth-of-type(8):hover {
  color: #fff;
}
.nav-button:nth-of-type(8):hover ~ #nav-content-highlight {
  top: 394px;
}

#nav-bar .fas {
  min-width: 3rem;
  text-align: center;
}

/* snackbar */
.snackbar {
  background-color: #fff;
  position: absolute;
  z-index: 2;
  border-radius: 10px;
  padding: 20px 60px;
  font-family: "Quicksand", sans-serif;
  top: 18px;
  box-shadow: 0px 5px 180x rgba(0, 0, 0, 0.2);
  border-left: solid 6px #3ab164;
  overflow: hidden;
  left: 795px;
  transform: translateY(-150px);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.snackbar.active {
  transform: translateY(0px);
}

.progress {
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
}

.progress::before {
  content: " ";
  background-color: #3ab164;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
}

.progress.active::before {
  animation: snackbar 2.5s linear forwards;
}
@keyframes snackbar {
  100% {
    right: 100%;
  }
}
</style>
