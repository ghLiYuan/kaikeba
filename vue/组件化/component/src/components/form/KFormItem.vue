<template>
  <div>
    <label>{{ label }}</label>
    <slot></slot>
    <span v-if="error"></span>
  </div>
</template>

<script>
export default {
  name: "KFormItem",
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      error: ''
    }
  },
}
</script>

<style scoped>

</style>