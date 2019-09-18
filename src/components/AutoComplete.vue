<template>
  <div class="autocomplete">
    <input
        ref="search"
        type="text"
        v-model="query"
        @input="onChange"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
    />
    <i class="autocomplete-clear" v-if="query" @click="clearQuery">&times;</i>
    <ul class="autocomplete-results" v-show="isOpen">
      <li
          v-for="(result, i) in results"
          @click="setResult(result, i)"
          :key="i"
          class="autocomplete-result"
          :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'AutoComplete',
    props: {
      items: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data() {
      return {
        query: '',
        results: [],
        isOpen: false,
        arrowCounter: 0,
        isFocus: false
      }
    },
    methods: {
      onChange() {
        this.isOpen = true
        this.filter()
      },
      filter() {
        this.results = this.items.filter(item => item.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1)
      },
      setResult(result, i) {
        this.arrowCounter = i
        this.query = result.title
        this.isOpen = false
      },
      handleClickOutside(e) {
        if (!this.$el.contains(e.target)) {
          this.isOpen = false
          this.arrowCounter = -1
        }
      },
      onArrowDown() {
        if (this.arrowCounter < this.results.length) {
          this.arrowCounter = this.arrowCounter + 1
        }
      },
      onArrowUp() {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter - 1
        }
      },
      onEnter() {
        if (this.arrowCounter > 0) {
          this.query = this.results[this.arrowCounter].title
          this.isOpen = false
          this.arrowCounter = -1
        }
      },
      clearQuery() {
        this.query = ''
      }
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside)
    },
    destroyed() {
      document.removeEventListener('click', this.handleClickOutside)
    },
    watch: {
      isFocus() {
        if (this.isFocus && !this.query) {
          this.results = this.items
          this.isOpen = true
        }
      }
    }
  }
</script>
