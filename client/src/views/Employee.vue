<template>
<div>
    
      <Employee />
    
    <AllEmployee />
</div>  
</template>

<script>
import Employee from '../components/Employee_new.component.vue'
import AllEmployee from '../components/Employee_all.component.vue'
export default {
  components: {
    Employee,
    AllEmployee
  }

}
</script>

<style>
 
</style>