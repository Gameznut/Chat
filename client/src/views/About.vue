<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Chatapp msg="1"/>
  </div>
</template>
<script>
import Chatapp from '../components/Chatapp.vue'
export default {
  components: { Chatapp },
}
</script>
