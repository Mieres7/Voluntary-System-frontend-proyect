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
  justify-content: space-between;
  width: 100px;
  height: 60px;
  background-color: white;
  border-radius: 16px;
  margin-right: 20px;
  padding: 0px 20px 0px 20px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
}
</style>
