<script lang="ts" setup>
import type { FetchError } from 'ofetch'
import type { ErrorInterface } from '#shared/interfaces/error.interface'
import { useToastStore } from '~/stores/toast.store'
import type { RegisterInterface } from '#shared/interfaces/register.interface'

const createRegisterForm = (): RegisterInterface => ({
  email: '',
  password: '',
  confirmPassword: '',
  processingPersonalData: false
})

const registerData = ref<RegisterInterface>(createRegisterForm())

const toastStore = useToastStore()

const registerUser = async () => {
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: registerData.value
    }).then(res => {
      if (res.statusCode === 200) {
        toastStore.showToast('success', 'Вы успешно зарегистрировались')
        navigateTo('/auth/login')
      }
    })
  } catch (error: unknown) {
    const errorInfo = error as FetchError<ErrorInterface>
    toastStore.showToast('error', errorInfo.data?.message || 'Что-то пошло не так...')
  } finally {
    registerData.value = createRegisterForm()
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__form">
      <InputField
        v-model="registerData.email"
        placeholder="Email"
        type="email"
        variant="transparent"
      />
      <InputPassword
        v-model="registerData.password"
        placeholder="Пароль"
      />
      <InputPassword
        v-model="registerData.confirmPassword"
        placeholder="Повторите пароль"
      />
    </div>
    <label class="auth__additional-info" for="additional-info">
      <input
        id="additional-info"
        v-model="registerData.processingPersonalData"
        type="checkbox"
      />
      <span>Согласен на обработку персональных данных</span>
    </label>
    <div class="auth__actions">
      <ActionButton variant="primary" @click="registerUser">
        Зарегистрироваться
      </ActionButton>
      <NuxtLink to="/auth/restore">Забыли пароль?</NuxtLink>
    </div>
  </div>
</template>

<style scoped src="./auth-form.css">

</style>
