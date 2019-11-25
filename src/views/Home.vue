<template>
  <div class="home">
    <MapPlayer />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld'
import MapPlayer from '@/components/MapPlayer'

export default {
  name: 'home',
  components: {
    HelloWorld,
    MapPlayer
  }
}
</script>
