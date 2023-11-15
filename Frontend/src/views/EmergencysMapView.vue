<script setup>
import SideBar from "../components/SideBar.vue";
import MapContainer from "../components/MapContainer.vue";
import SearchBar from "../components/SearchBar.vue";
import ProfileLogo from "../components/ProfileLogo.vue";
</script>

<template>
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
      <MapContainer />
    </div>
    <div class="sidebar-r">
      <i class="fa-solid fa-gear fa-xl" style="color: #cecece"></i>
    </div>
    <div class="extra"></div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 6.25% 90.9% 2.85%;
  grid-template-rows: 10vh 87.7vh 2.3vh;
  grid-template-areas:
    "logo profile profile"
    "sidebar-r cards   sidebar-l"
    "extra     extra   extra";
  background-image: linear-gradient(150deg, #00a2bb, #205a72, #11303d);
}

.sidebar-l {
  grid-area: sidebar-r;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-r {
  grid-area: sidebar-l;
  display: flex;
  align-items: end;
  justify-content: center;
}

.cards {
  display: flex;
  grid-area: cards;
}

.profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: profile;
}

.extra {
  grid-area: extra;
}

.logo {
  grid-area: logo;
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
</style>
