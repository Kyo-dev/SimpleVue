<template>
  <div>
      
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
class Bono {
    constructor(cedula, motivo, cantidad, fecha){
        (this.cedula = cedula),
        (this.motivo = motivo),
        (this.cantidad = cantidad),
        (this.fecha = fecha)
    }
}
export default {
    data(){
        return{
            bono: new Bono(),
            bono: []
        }
    },
    methods:{
        ...mapActions(["fetchBonos"]),
        
    },
    created(){
        this.fetchBonos();
    }
}
</script>

<style>

</style>