<template>
  <div id="app">
    <auto-complete :items="list"></auto-complete>
  </div>
</template>

<script>
import AutoComplete from './components/AutoComplete'

export default {
  name: 'app',
  components: {
    AutoComplete
  },
  data () {
    return {
      list: [],
      currentApi: 'https://jsonplaceholder.typicode.com/photos'
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      const res = await fetch(this.currentApi)
      this.list = await res.json()
    }
  }

}
</script>
