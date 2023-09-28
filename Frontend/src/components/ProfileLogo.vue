<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProfileLogo",
});
</script>
<template>
  <div class="profile-card">
    Vicente
    <div class="profile-picture">
      <i class="fa-solid fa-user"></i>
    </div>
  </div>
</template>

<style>
.profile-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 120px;
  height: 60px;
  background-color: #fff;
  border-radius: 16px;
  margin-right: 20px;
  padding: 0px 10px 0px 10px;
  font-size: 1.1rem;
  font-weight: 400;
  font-family: "Quicksand", sans-serif;
}
</style>
