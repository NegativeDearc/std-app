<template>
  <v-app>
    <AppTaskToolbar/>
    <AppTaskContent/>
    <AppTaskFooter/>
  </v-app>
</template>

<script>
import AppTaskToolbar from '../task/AppTaskToolbar'
import AppTaskContent from '../task/AppTaskContent'
import AppTaskFooter from '../task/AppTaskFooter'

export default {
  name: 'AppTask',
  components: {AppTaskToolbar, AppTaskContent, AppTaskFooter},
}
</script>

<style scoped>

</style>
