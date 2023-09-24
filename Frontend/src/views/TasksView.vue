<script setup>
import SideBar from "../components/SideBar.vue";
import TasksContainer from "../components/TasksContainer.vue";
import SearchBar from "../components/SearchBar.vue";
import ProfileLogo from "../components/ProfileLogo.vue";
import Snackbar from "../components/Snackbar.vue";
</script>

<template>
  <div class="snack">
    <Snackbar />

    <div class="container">
      <div class="logo">
        <img src="../components/icons/desastre.png" alt="" />
      </div>
      <aside class="sidebar-l">
        <SideBar />
      </aside>

      <div class="profile">
        <SearchBar />
        <ProfileLogo />
      </div>
      <div class="cards">
        <TasksContainer />
      </div>
      <div class="sidebar-r">
        <i class="fa-solid fa-gear fa-xl" style="color: #cecece"></i>
      </div>
      <div class="extra">
        <!-- <i class="fa-solid fa-gear fa-xl"></i> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 6.25% 90.9% 2.85%;
  /* grid-template-columns: ; */
  grid-template-rows: 10vh 87.7vh 2.3vh;
  grid-template-areas:
    "logo profile profile"
    "sidebar-r cards   sidebar-l"
    "extra     extra   extra";
}

.sidebar-l {
  grid-area: sidebar-r;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #11303d;
}

.sidebar-r {
  grid-area: sidebar-l;
  background: #11303d;
  display: flex;
  align-items: end;
  justify-content: center;
  /* padding: 0 0 0; */
}

.cards {
  display: flex;
  grid-area: cards;
  background: #11303d;
}

.profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: profile;
  background: #11303d;
  /* background-color: #5c551e; */
}

.extra {
  grid-area: extra;
  background: #11303d;
}

.logo {
  grid-area: logo;
  background: #11303d;
  display: flex;
  align-items: center;
  justify-content: center;
}

i {
  margin-bottom: 10px;
  z-index: 1;
}

img {
  width: 80px;
  height: 80px;
}

.snack {
  /* position: absolute; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.snackbar {
  background-color: #fff;
  position: absolute;
  z-index: 999;
  border-radius: 10px;
  padding: 20px 60px;
  font-family: "Quicksand", sans-serif;
  top: 18px;
  box-shadow: 0px 5px 180x rgba(0, 0, 0, 0.2);
  border-left: solid 6px #3ab164;
  overflow: hidden;
  transform: translateY(-150px);
}

.progress {
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  /* background: red; */
}

.progress:active {
  transform: translateY(0px);
}

progress::before {
  content: " ";
  background-color: #3ab164;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
