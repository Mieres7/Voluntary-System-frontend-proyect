<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchBar",
});
</script>

<template>
  <div class="bar">
    <img src="../components/icons/lupa.svg" alt="" />
    <input type="text" class="text" id="inputBtn" />
  </div>
</template>

<style scoped>
.text {
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  padding-left: 25px;
  width: 500px;
  background: #fff;
  /* background: #c89d72;
  background: #2a789a; */
}

.bar {
  display: flex;
  align-content: center;
  background: #fff;
  /* background: #c89d72;
  background: #2a789a; */
  padding: 15px 26px 15px 26px;
  border-radius: 30px;
  width: 500px;
  height: 20px;
  border: none;
}

div:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transform: translateY(-3%);
  transition: 0.1s ease;
}

img {
  width: 20px;
  height: 21px;
}
</style>
