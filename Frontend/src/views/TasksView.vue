<script setup>
import SideBar from "../components/SideBar.vue";
import TasksContainer from "../components/TasksContainer.vue";
import SearchBar from "../components/SearchBar.vue";
import ProfileLogo from "../components/ProfileLogo.vue";
</script>

<template>
  <div class="container">
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
      <i class="fa-solid fa-gear fa-xl"></i>
    </div>
    <div class="extra"></div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 6.25% 90.9% 2.85%;
  grid-template-rows: 10vh 87.5vh 2.5vh;
  grid-template-areas:
    "sidebar-r profile profile"
    "sidebar-r cards   sidebar-l"
    "extra     extra   extra";
}

.sidebar-l {
  grid-area: sidebar-r;
  background-color: rgb(241, 236, 236);
  background-color: #ca9b72;
  /* background-color: red; */
}

.sidebar-r {
  grid-area: sidebar-l;
  background-color: rgb(241, 236, 236);
  background-color: #ca9b72;
  display: flex;
  align-items: end;
  justify-content: center;
  padding: 0 0 15px 0;
}

.cards {
  grid-area: cards;
  background-color: rgb(241, 236, 236);
  background-color: #ca9b72;
  display: flex;
  flex-direction: row;
  /* align-content: center;
  justify-content: center; */
}

.profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: profile;
  background-color: rgb(241, 236, 236);
  background-color: #ca9b72;
}

.extra {
  grid-area: extra;
  background-color: rgb(241, 236, 236);
  background-color: #ca9b72;
}

/* @media screen and (min-width: 1024px) {
  .container {
    grid-template-columns: ;
    grid-template-rows: ;
    grid-template-areas: ;
  }
} */
</style>
