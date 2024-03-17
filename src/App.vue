<template>
  <Prueba></Prueba>
  <v-app>
    <v-card style="width: 380px; height: 800px; display: block" elevation="6">
      <v-img
        :src="cImagenFondo"
        class="align-end fill-width"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"        
        cover
      >
      </v-img>
      <v-row
        class="v-flex flex-row justify-center align-center mt-4 borde"
        style="padding: 0px; height: 60px"
      >
        <v-btn class="boton mr-2" color="green" style="width:145px;"> Iniciar Ayuno </v-btn>
        <v-btn class="boton ml-2" color="pink" style="width:145px;"> Finalizar ayuno </v-btn>
      </v-row>
      <v-row class="mb-8 mt-10 borde">
        <v-progress-circular
          :model-value="value"
          :rotate="360"
          :size="200"
          :width="30"
          color="teal"
          style="margin: 0 auto"
        >
          {{ value }}
        </v-progress-circular>
      </v-row>
      <v-row class="borde" style="width: 355px; margin: 0 auto">
        <v-alert
          text="¡Fantástico! Estás promoviendo un estado antiinflamatorio y anabólico en tu cuerpo, maximizando los beneficios de tu ayuno."
          title="10 Horas"
          type="info"
          variant="tonal"
        ></v-alert>
      </v-row>
      <v-row class="mt-16 v-flex flex-row justify-center">
        <v-btn color="indigo"> Mostrar Resumen </v-btn>
      </v-row>
    </v-card>
  </v-app>
</template>

<script>
import Prueba from "./components/Prueba.vue";
import Login from "./components/Login.vue";
export default {
  name: "App",
  components: {
    Prueba,
    Login,
  },
  data() {
    return {
      interval: {},
      value: 0,
      cImagenFondo: "/images/MarcaAgua01.png"
    };
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  mounted() {    
    this.interval = setInterval(() => {
      if (this.value === 100) {
        this.value = 0;
      } else {
        this.value += 10;
      }
    }, 1000);
  },
};
</script>

<style scoped>
.boton {
  text-transform: none;
}
.borde {
  border: 0px solid red;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
