
<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            
            :counter="9"
            label="Cedula"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>


<script>
export default {
    data(){
         valid: true
    }
}
</script>

<style>

</style>