<template>
    <div class="contenedor-imagen is-unselectable">

        <div class="contenedor-imagen-retroceder">
            <img src="@/assets/arrow-left.png" @click="retroceder">
        </div>

        <div class="contenedor-imagen-img zoom">
            <img :src="[`${require(`@/assets/${imagenActual}`)}`]">
        </div>

        <div class="contenedor-imagen-avanzar">
            <img src="@/assets/arrow-right.png" @click="avanzar">
        </div>

        <div class="boton-salir">
            <a class="button is-white" @click="salir">Salir</a>
        </div>

    </div>
</template>

<script>

    import { mapState, mapMutations } from 'vuex';

    export default {
        name: 'GaleriaCarousel',
        props: {
            img: String
        },

        data(){
            return {
                eventosTeclado: false,
                imagenActual: this.img
            }
        },

        computed: {
            ...mapState(["imagenesCargadas"]),
            imagenUrl(){
                return this.img;
            }
        },

        methods: {
            ...mapMutations(["salirCarousel"]),

            avanzar(){
                let posicion = null;
                let imagen = null;
                posicion = this.imagenesCargadas.indexOf(this.imagenActual);
                imagen = this.imagenesCargadas[posicion+1];
                
                if(imagen == undefined || imagen == null){
                    imagen = this.imagenesCargadas[0];
                }
                
                this.imagenActual = imagen;
            },

            retroceder(){
                let posicion = this.imagenesCargadas.indexOf(this.imagenActual);
                let imagen = this.imagenesCargadas[posicion-1];

                if(imagen == undefined || imagen == null){
                    imagen = this.imagenesCargadas[this.imagenesCargadas.length-1];
                }

                this.imagenActual = imagen;
            },

            salir(){
                this.salirCarousel();
            }

        },
        created(){
            this.eventosTeclado = true;
        },
        mounted(){

            document.body.addEventListener('keydown', evento => {
                if(evento.keyCode == 37 && this.eventosTeclado){
                    this.retroceder();
                }
                else if(evento.keyCode == 39 && this.eventosTeclado){
                    this.avanzar();
                }
                else if(evento.keyCode == 27 && this.eventosTeclado){
                    this.salir();
                }
            })

        },
        beforeDestroy(){
            this.eventosTeclado = false;
        }    
    }

</script>

<style scoped lang="scss">
    .contenedor-imagen{
        position: fixed;
        background-color: rgb(61, 61, 61);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 100vh;
        display: grid;
        grid-template-columns: 12.5% 75% 12.5%;
        grid-template-rows: 100vh;
        overflow: hidden;
        grid-template-areas: "retroceder img avanzar";

        &-retroceder,
        &-avanzar { 
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            transition: all 1s;

            img{ // Botonos de Siguiente/Retroceder
                width: 65px;
                transition: transform .2s;

                &:hover{
                    transform: scale(1.10);
                    cursor: pointer;
                }

                @media screen and (max-width:574px){
                    width: 45px;
                }

                @media screen and (min-width:575px) and (max-width:850px){
                    width: 55px;
                }

                @media screen and (min-width:850px) and (max-width:1200px){
                    width: 65px;
                }

                @media screen and (min-width: 1200px) and (max-width: 1800px){
                    width: 85px;
                }

                @media screen and (min-width: 1800px){
                    width: 100px;
                }
            }
        }

        &-retroceder{
            grid-area: retroceder;
        }

        &-avanzar {
            grid-area: avanzar; 
        }

        &-img{
            grid-area: img;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;

            div { // Preloader
                transition: all .3s;

                &:hover {
                    transform: scale(1.10);
                }

                img { 
                    width: 75px; 
                }
            }

            img{ // Imagen cargada
                width: 100%;
            }
        }

        .boton-salir{
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 100%;
            height: auto;
            text-align: center;
            
            a{
                padding: 20px;
                width: 200px;

                @media screen and (min-width: 1200px){
                    width: 270px;
                    padding: 32px;
                }

                @media screen and (min-width: 1800px){
                    font-size: 22px;
                    width: 350px;
                    padding: 32px;
                }
            }
        }

        @media screen and (max-width: 520px){
            grid-template-columns: 15% 70% 15%;
        }  

    }
</style>