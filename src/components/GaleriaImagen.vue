<template>
    <div class="is-center-flex">
        <div class="card is-card is-zoom">

            <div class="card-content is-paddingless">

                <div v-if="preloader == 'preloader-loading' || 
                           preloader == 'preloader-prepare'" 
                class="preloader-loading aparecer is-center-flex">

                    <div class="preloader">
                    </div>

                </div> <!-- Circulo de Carga -->

                <div v-else-if="preloader == 'preloader-error'"
                 class="preloader-error aparecer is-center-flex">

                    <img :src="[`${require(`@/assets/error.png`)}`]">
                
                </div> <!-- Img de error -->

                <img 
                    :src="[`${require(`@/assets/${url}`)}`]" 
                    :class="[display]"  
                    @error="errorImagen" 
                    @load="cargadaImagen"
                > <!-- Solo será visible cuando se descargue -->
               
            </div> <!-- card-content -->

            <div class="card-footer">
                <button :class="['button', 'is-fullwidth', 'is-info', loading]" @click="accionBtn"> 
                    {{ textoBtn }}
                </button>
            </div> <!-- card-footer -->
        </div>

        <div v-if="imagenActual != null">
            <GaleriaCarousel :img="imagenActual"></GaleriaCarousel>
        </div>
        
    </div>
</template>

<script>
    import GaleriaCarousel from "./GaleriaCarousel.vue";
    import { mapState, mapMutations } from "vuex";

    export default {
        name: "GaleriaImagen",
        components: {
            GaleriaCarousel
        },
        props: {
            url: String
        },
        data(){
            return {
                display: "is-none",
                preloader: "preloader-prepare",
                loading: "", // Circulo de carga en el boton de acciones de la card
                textoBtn: "", // Texto en el boton de acciones de la card
                imagenCargada: false,
            }
        },
        computed: {
            ...mapState(["imagenesCargadas", "imagenActual"]),
        },
        methods: {
            ...mapMutations(["llenarImagenesCargadas", "imagenCarousel"]),

            accionBtn(){
                if(this.imagenCargada){
                    this.imagenCarousel(this.url);
                } else {
                    this.recargar();
                }
            },

            recargar(){
                this.display = "is-block";
                this.display = "is-none";
                this.cargandoImagen();
            },

            // Estado de la imagen

            cargandoImagen(){
                this.display = "is-none",
                this.preloader = 'preloader-loading';
                this.loading = 'is-loading';
                this.textoBtn = '';
                this.imagenCargada = false;
            },

            errorImagen(){
                this.display = "is-none",
                this.loading = '';
                this.preloader = 'preloader-error';
                this.textoBtn = 'Recargar';
                this.imagenCargada = false;
            },

            cargadaImagen(){
                this.loading = '';
                this.preloader = '';
                this.textoBtn = 'Ver imagen';
                this.display = 'is-block';
                this.imagenCargada = true;

                if(!this.imagenesCargadas.includes(this.url)){
                    // Agrega la imagen al array de la tienda, para el 'contenedor-imagen'
                    this.llenarImagenesCargadas(this.url);
                }
            },
            
        }
    }
</script>

<style scoped lang="scss">
    .is-card {
        background: none;
        margin: 10px 0 28px 0;
        width: 100%;
        max-width: 250px;
        height: 175px;
        border: 1px solid rgb(216, 216, 216);
        
        img {
            width: 100%;
            max-width: 250px;
            height: 175px;
        }
    }

    .preloader-loading, .preloader-error, .preloader-prepare {
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 35px;
        width: 100%;
        height: 175px;
    }

    .preloader-loading {

        .preloader{
            border-top: 2px solid white;
            border-top-color: white;
            border-bottom: 2px solid blue;
            border-left: 2px solid blue;
            border-right: 2px solid blue;
            border-radius: 50%;
            padding:20px;
            width: 10px;
            height: 10px; 
            animation: girar .8s infinite linear;
        }

    }

    .preloader-error {
        background-size: 55px;
        background-position: center;
        background-repeat: no-repeat;

        img {
            width: auto;
            height: auto;
        }
    }

    @media screen and (max-width: 574px){
        .is-card {
            width: 100%;
            max-width: 150px;
            height: 105px;

            img {
                width: 100%;
                max-width: 150px;
                height: 105px;
            }
        }

        .preloader-loading, .preloader-error, .preloader-prepare {
            width: 100%;
            max-width: 150px;
            height: 105px;
        }

        .preloader-error {
            img {
                width: 66px;
                height: auto;
            }
        }
    }
</style>