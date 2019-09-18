<template>
<div>
    
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
 methods: {
    ...mapActions(["fetchEmployee"])
   },

   computed: mapGetters(["allEmployees"]),
    created() {
      this.fetchEmployee();
    //   console.log(this.fetchEmployee())
   },
}
</script>

<style>

</style>