<template>
    <main class="container is-mobile">
        <div class="columns is-mobile is-multiline is-margin-5 is-padding-vertical">

            <div class="column is-3-desktop is-4-tablet is-6-mobile" 
                v-for="(item, index) in imagenesUrl" :key="index">
                <GaleriaImagen :url="item"></GaleriaImagen>
            </div>

        </div>
    </main>
</template>


<script>

    import GaleriaImagen from "./GaleriaImagen.vue"
    import { mapState } from "vuex";

    export default {

        name: "Galeria",
        components: {
            GaleriaImagen
        },
        data(){
            return {
                imagenes: [] // Ordenado
            }
        },
        computed: {
            ...mapState(["imagenesUrl"])
        },
        methods: {
            ordenarArray(){
                let arrayOrdenado = this.imagenesUrl.sort();
                this.imagenes = arrayOrdenado;
            }
        },
        created(){
            this.ordenarArray();
        }
    }

</script>