<template>
  <div style="display: block; position: relative">
    <v-btn color="blue" id="boton"> Boton azul </v-btn>
    <div class="image-container" id="div_imagen">
      <v-img class="zoom-image" src="./images/imagen.png"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZoomImage",
};
</script>

<style>
@keyframes zoom-animation {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

.zoom-image {
  animation: zoom-animation 10s ease-in-out infinite;
  width: 100%;
  height: auto;
}

@keyframes slideDownFadeIn {
  from {
    top: -50px;
    opacity: 0;
  }
  to {
    top: 30px;
    opacity: 1;
  }
}

.image-container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 380px;
  height: 200px;
  overflow: hidden;
}

#div_imagen {
  z-index: 20;
}

#boton {
  position: absolute;
  z-index: 21;
  left: 30px;
  animation: slideDownFadeIn 2s ease forwards; /* Actualizado para incluir la opacidad */
}

.zoom-image {
  animation: zoom-animation 10s ease-in infinite;
  width: 100%;
  height: auto;
}
</style>
