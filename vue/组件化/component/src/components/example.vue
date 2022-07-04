<template>
  <div>
    <KInput
        v-model="model.username"
        placeholder="请输入用户名"
    />
    {{ model.username }}
  </div>
</template>

<script>
import KInput from "@/components/form/KInput";
export default {
  name: "comp-example",
  components: {
    KInput,
  },
  data() {
    return {
      model: {
        username: ''
      }
    }
  },
}
</script>

<style scoped>

</style>
