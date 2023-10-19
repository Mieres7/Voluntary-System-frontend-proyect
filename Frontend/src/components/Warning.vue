<template>
  <div class="center-snack">
    <div :class="{ active: show }" class="snackbar" @click="showSnackbar">
      <div :class="{ active: show }" class="progress"></div>
      {{ warningMessage }}
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "Warning",
  props: {
    showMessage: {
      type: Boolean,
      default: false,
    },
    warningNumber: {
      type: String,
      default: "Error",
    },
  },
  setup(props) {
    const warnings = [
      "¡Esta función aún está en desarrollo!",
      "¡Tarea creada correctamente!",
      "¡Error al crear la tarea!",
      "¡Usuario o constraseña incorrectos!",
      "¡El usuario ya existe!",
    ];

    const show = ref(props.showMessage);
    const warningMessage = ref("");

    watch(
      () => props.showMessage,
      (newVal) => {
        if (newVal) {
          showSnackbar();
        }
      }
    );

    const showSnackbar = () => {
      switch (props.warningNumber) {
        case "0":
          warningMessage.value = warnings[0];
          break;
        case "1":
          warningMessage.value = warnings[1];
          break;
        case "2":
          warningMessage.value = warnings[2];
          break;
        case "3":
          warningMessage.value = warnings[3];
          break;
        case "4":
          warningMessage.value = warnings[4];
          break;
        default:
          break;
      }

      show.value = true;
      setTimeout(() => {
        show.value = false;
      }, 2500);
    };

    return { showSnackbar, warningMessage, show };
  },
};
</script>
