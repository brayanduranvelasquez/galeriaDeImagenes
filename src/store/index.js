import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    imagenesUrl: [
      "planta.jpg",
      "espacio1.jpg",
      "espacio2.jpg",
      "fondo.jpg",
      "arboles.jpg",
      "gato.jpg",
      "otoño.jpg",
      "espacio3.jpg"
    ],
    imagenesCargadas: [], // Aqui se ordenarán en orden alfabetico para visualizarse
    imagenActual: null // Para poder abrir y cerrar el Carousel, si es null, se ocultara
  },

  mutations: {
    llenarImagenesCargadas(state, imagen) {
      state.imagenesCargadas.push(imagen);
      state.imagenesCargadas.sort();
    },

    imagenCarousel(state, ImagenCarousel){
      state.imagenActual = ImagenCarousel;
    },

    salirCarousel(state){
      state.imagenActual = null;
    }
  }
});
