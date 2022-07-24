<template>
  <KForm>
    <KFormItem
        label="username"
        prop="username"
    >
      <KInput
          v-model="model.username"
          placeholder="请输入用户名"
      />
    </KFormItem>
    <KFormItem
        label="password"
        prop="password"
    >
      <KInput
          v-model="model.password"
          placeholder="请输入密码"
          type="password"
      />
    </KFormItem>

  </KForm>
</template>

<script>
import KInput from "@/components/form/KInput";
import KForm from "@/components/form/KForm";
import KFormItem from "@/components/form/KFormItem";
export default {
  name: "comp-example",
  components: {
    KInput,
    KForm,
    KFormItem
  },
  data() {
    return {
      model: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: 'username is required' }
        ],
        password: [
          { required: true, message: 'password is required' }
        ],
      }
    }
  },
  methods: {
    validate() {
      console.log('form validate')
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate();
    })
  }
}
</script>

<style scoped>

</style>
