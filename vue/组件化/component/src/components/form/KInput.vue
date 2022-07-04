<template>
  <div data-custom="abc">
    <input
      type="text"
      :value="value"
      @input="onInput"
      v-bind="$attrs"
    >
  </div>
</template>

<script>
export default {
  name: "KInput",
  inheritAttrs: false,
  props: {
    value: {
      type: [ String, Number ],
      default: ''
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  },
}
</script>

<style scoped>

</style>
