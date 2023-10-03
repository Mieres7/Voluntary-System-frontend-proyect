<script>
import { defineComponent } from "vue";
import AuthService from "../services/AuthService";
export default defineComponent({
  name: "Login",
  components: {},
  data() {
    return {
      firstName: "",
      username: "",
      password: "",
    };
  },
  methods: {
    change: function () {
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
    },

    login() {
      const auth = new AuthService();
      auth.login(this.username, this.password);
    },

    register() {
      const auth = new AuthService();
      auth.register(this.nombre, this.username, this.password);
    },
  },
});
</script>

<template>
  <body>
    <div class="container login">
      <div class="form-information">
        <div class="form-information-childs">
          <h1>Bienvenido!</h1>
          <h2>Crear una cuenta</h2>
          <form class="form">
            <label>
              <i class="bx bxs-crown"></i>
              <input type="text" placeholder="Nombre" v-model="firstName" />
            </label>
            <label>
              <i class="bx bx-user"></i>
              <input type="email" placeholder="Username" v-model="username" />
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
          <div class="icons">
            <i class="bx bxl-google"></i>
            <i class="bx bxl-facebook"></i>
            <i class="bx bxl-github"></i>
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

    <div class="container register hide">
      <div class="form-information">
        <div class="form-information-childs">
          <h1>Bienvenido de vuelta!</h1>
          <h2>Iniciar sesión</h2>
          <form class="form">
            <label>
              <i class="bx bx-envelope"></i>
              <input type="email" placeholder="Username" v-model="username" />
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
          <div class="icons">
            <i class="bx bxl-google"></i>
            <i class="bx bxl-facebook"></i>
            <i class="bx bxl-github"></i>
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
    <!-- <p>hola</p> -->
  </body>
</template>

<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}
.container {
  margin: 20px;
  transform: all 1s ease;
  border-radius: 20px;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  height: 540px;
  width: 400px;
  max-width: 900px;
  transform: translateY(0);
  transition: transform 1.5s ease;
}
.form-information {
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 20px;
}

.form-information-childs h1 {
  color: #333;
  font-size: 1rem;
  font-family: "Quicksand", sans-serif;
}
.form-information-childs h2 {
  color: #333;
  font-size: 2rem;
  font-family: "Quicksand", sans-serif;
}
.form-information-childs p {
  color: #555;
  font-family: "Quicksand", sans-serif;
}
.icons {
  margin: 10px 0 25px 0;
}
.icons i {
  border-radius: 50%;
  padding: 15px;
  cursor: pointer;
  margin: 0 10px;
  color: #003366;
  transition: background-color 0.3s ease;
  border: solid thin #003366;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.hide {
  position: fixed;
  transform: translate(0, -300%);
  transition: transform 2s ease;
}
.icons i:hover {
  background-color: #003366;
  color: #fff;
  transition: 0.5s ease;
}
.form {
  margin: 30px 0 0 0;
}
.form label {
  display: flex;
  background-color: #fff;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 20px;
  padding: 0 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.form label input {
  width: 100%;
  padding: 15px;
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 20px;
  color: #333;
  font-family: "Quicksand", sans-serif;
}
.form label i {
  color: #a7a7a7;
}
.form input[type="submit"] {
  background-color: #d5a983;
  background-color: #003366;
  color: #fff;
  border-radius: 20px;
  border: none;
  padding: 10px 25px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: "Quicksand", sans-serif;
}
.form input[type="submit"]:hover {
  background-color: #fff;
  color: #003366;
  transition: 0.5s ease;
}
.form label:hover {
  transform: translateY(-10%);
  transition: 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.test {
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
}
.test p {
  margin: 0 5px;
}
.test2 {
  position: absolute;
  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
}
.test2 p {
  margin: 0 5px;
}
.regBtn {
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  text-decoration: underline;
  font-family: "Quicksand", sans-serif;
  color: #333;
}
.regBtn:hover {
  color: #003366;
  transition: 0.1 ease;
}
</style>
