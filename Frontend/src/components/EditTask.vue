<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "EditTask",
  data() {
    return {
      prueba: {
        dato: "holahola",
      },
    };
  },
});
</script>

<template>
  <div class="card">
    <h1>Editar Tarea</h1>
    <form>
      <!-- <input type="text" placeholder="Descripción" /> -->
      <label>
        Nombre:
        <!-- <input type="text" placeholder="Nombre" /> -->
        <input type="text" placeholder="Nombre" value="nombreActual" /> </label
      ><br />
      <label>
        Voluntarios:
        <input
          type="text"
          placeholder="Voluntarios"
          value="voluntariosActuales"
        />
      </label>
      <br />
      Descripcion:
      <label>
        <textarea name="Descripcion" id="" cols="20" rows="10"></textarea>
      </label>
    </form>
    <button>Guardar cambios</button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* width: 700px;
  height: 500px; */
  background-color: #d3d3d3;
  border-radius: 20px;
  padding: 20px;
  font-family: "Quicksand", sans-serif;
}
</style>
