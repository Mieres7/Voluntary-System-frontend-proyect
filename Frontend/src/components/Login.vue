<script>
import axios from "axios";
import { ref } from "vue";
import Warning from "./Warning.vue";

export default {
  name: "Login",
  components: { Warning },
  setup() {
    const username = ref(""),
      password = ref(""),
      first_name = ref(""),
      error = ref("");

    const show = ref(false),
      show_login = ref(false);

    function showError(errorValue) {
      switch (errorValue) {
        case 0:
          show.value = true;
          setTimeout(() => {
            show.value = false;
          }, 2500);
          break;
        case 1:
          show_login.value = true;
          setTimeout(() => {
            show_login.value = false;
          }, 2500);
        default:
          break;
      }
    }

    const change = () => {
      const d = document;
      const $login = d.querySelector(".login"),
        $register = d.querySelector(".register");
      const $btnLogin = d.getElementById("btnLogin"),
        $btnRegister = d.getElementById("btnRegister");
      $btnLogin.addEventListener("click", (e) => {
        $login.classList.add("hide");
        setTimeout(() => {
          $register.classList.remove("hide");
        }, 200);
      });
      $btnRegister.addEventListener("click", (e) => {
        setTimeout(() => {
          $login.classList.remove("hide");
        }, 200);
        $register.classList.add("hide");
      });
    };
    const login = () => {
      const credentials = {
        username: username.value,
        password: password.value,
      };
      // Solicitud POST al servidor para autenticar al usuario
      axios
        .post("http://localhost:8080/auth/login", credentials)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
          router.push("/task");
        })
        .catch((e) => {
          showError(1);
        });
    };
    const register = () => {
      const credentials = {
        username: username.value,
        password: password.value,
        name: first_name.value,
      };
      // Solicitud POST al servidor para autenticar al usuario
      axios
        .post("http://localhost:8080/auth/register", credentials)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
          router.push("/task");
        })
        .catch((e) => {
          showError(0);
        });
    };
    return {
      change,
      login,
      register,
      showError,
      first_name,
      username,
      password,
      error,
      show,
      show_login,
    };
  },
};
</script>

<template>
  <Warning :showMessage="show_login" :warningNumber="'1'" />
  <Warning :showMessage="show" :warningNumber="'0'" />

  <div class="login-main">
    <div class="login-reg-container login hide">
      <div class="form-information">
        <div class="form-information-childs">
          <h1>Bienvenido!</h1>
          <h2>Crear una cuenta</h2>
          <form class="form">
            <label>
              <i class="bx bxs-user"></i>
              <input
                type="text"
                placeholder="Nombre y apellido"
                v-model="first_name"
              />
            </label>
            <label>
              <i class="bx bx-crown"></i>
              <input type="email" placeholder="Usuario" v-model="username" />
            </label>
            <label>
              <i class="bx bx-lock-alt"></i>
              <input
                type="password"
                placeholder="Contraseña"
                v-model="password"
              />
            </label>
            <input
              type="submit"
              value="Registrarse"
              @click.prevent="register"
            />
          </form>
          <p>o regístrate con</p>
          <div class="icons-login">
            <i class="bx bxl-google btn" @click="showError(0)"></i>
            <i class="bx bxl-facebook btn" @click="showError(0)"></i>
            <i class="bx bxl-github btn" @click="showError(0)"></i>
          </div>
          <div class="test">
            <p>¿Ya tienes una cuenta?</p>
            <button class="regBtn" id="btnLogin" @click="change">
              Iniciar sesión
            </button>
            <!-- la id me lleva a register  -->
          </div>
        </div>
      </div>
    </div>

    <div class="login-reg-container register">
      <div class="form-information">
        <div class="form-information-childs">
          <h1>Bienvenido de vuelta!</h1>
          <h2>Iniciar sesión</h2>
          <form class="form">
            <label>
              <i class="bx bx-crown"></i>
              <input type="email" placeholder="Usuario" v-model="username" />
            </label>
            <label>
              <i class="bx bx-lock-alt"></i>
              <input
                type="password"
                placeholder="Contraseña"
                v-model="password"
              />
            </label>
            <input
              type="submit"
              value="Iniciar Sesión"
              @click.prevent="login"
            />
          </form>
          <p>o inicia sesión con</p>
          <div class="icons-login">
            <i class="bx bxl-google btn" @click="showError(0)"></i>
            <i class="bx bxl-facebook btn" @click="showError(0)"></i>
            <i class="bx bxl-github btn" @click="showError(0)"></i>
          </div>
          <div class="test2">
            <p>¿Aun no tienes cuenta?</p>
            <button class="regBtn" id="btnRegister" @click="change">
              Regístrate
            </button>
            <!-- la id me lleva a login -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped></style> -->
