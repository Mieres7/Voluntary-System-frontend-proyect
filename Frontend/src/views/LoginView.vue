<script setup>
import Login from "../components/Login.vue";
</script>

<template>
  <!-- 2 sided -->
  <!-- <section id="container">
    <div class="left"></div>
    <div class="right">
      <div class="content">
        <Login />
      </div>
    </div>
  </section> -->

  <!-- centered -->
  <div class="effect">
    <div class="center">
      <Login />
    </div>
  </div>
</template>

<style scoped>
/* 2 sided */

/* #container {
  display: flex;
}

.left {
  background: #d5a983;

  width: 65%;
  height: 100vh;
}

.content {
  backdrop-filter: blur(3px);
}

.right {
  background-size: cover;
  background-position: center;
  width: 35%;
  height: 100vh;
  position: relative;
  background-image: url("../views/icons/trees.jpg");
} */

/* centered */

.center {
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(0.5rem);
}

.effect {
  background-image: url("../views/icons/trees.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
