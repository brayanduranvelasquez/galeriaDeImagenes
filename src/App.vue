<template>
  <div>
    <Cabecera></Cabecera>
    <Galeria></Galeria>
  </div>
</template>

<script>
  import Cabecera from "./components/Cabecera.vue";
  import Galeria from "./components/Galeria.vue";

  export default {
    name: "App",
    components: {
      Cabecera,
      Galeria
    }
  };
</script>

<style lang="scss">
  .is-none {
    display: none;
  }

  .is-block {
    display: block;
  }

  .is-center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .is-padding-vertical {
    padding: 20px 0;
  }

  .is-margin-vertical {
    margin: 20px 0;
  }

  .is-margin-20 {
    margin: 20px;
  }

  .is-margin-5 {
    margin: 5px;
  }

  .is-zoom {
    transition: all 1s;

    &:hover {
      transform: scale(1.03);
    }
  }

  .is-pointer {
    cursor: pointer;
  }

  // Animaciones

  .zoom {
    animation: zoom 1s;
  }

  @keyframes zoom {
    from {
      transform: scale(0);
      transition: all 1s;
    }
    to {
      transform: scale(1);
    }
  }

  .girar {
    animation: girar 1.5s infinite linear;
  }
  @keyframes girar {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .aparecer {
    animation: aparecer 1s;
  }

  @keyframes aparecer {
    to {
      opacity: 1;
    }
    from {
      transition: all 1s;
      opacity: 0;
    }
  }
</style>