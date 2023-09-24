<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Task",
});
</script>

<template>
  <div class="task"></div>
</template>

<style scoped>
.task {
  width: 276px;
  height: 199px;
  /* background-color: #d3e3fd; */
  /* background-color: #fff; */
  background-color: #cecece;
  border-radius: 16px;
  z-index: 0;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
