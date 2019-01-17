<template>
  <div>
    <v-layout align-end justify-start row fill-height wrap>
      <v-flex sm1 offset-sm1>
        <span>Every</span>
      </v-flex>
      <v-flex sm2>
        <v-text-field
          mask="##"
          hide-details
          single-line
          v-model="daily.INTERVAL"
        ></v-text-field>
      </v-flex>
      <v-flex sm1>
        <span>
          day(s)
        </span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'rrlueByDay',
  data () {
    return {
      daily: {
        FREQ: 'DAILY',
        INTERVAL: '1'
      }
    }
  },
  watch: {
    daily: {
      handler: function () {
        this.emitDailyRules()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    emitDailyRules: function () {
      this.$store.commit('CHANGE_RRULE_STRINGS', this.daily)
    }
  }
}
</script>

<style scoped>

</style>
