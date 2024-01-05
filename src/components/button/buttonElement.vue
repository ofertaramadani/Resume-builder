<template>
  <button class="btn" @click="submit"><slot></slot></button>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
@import './buttons';
</style>
