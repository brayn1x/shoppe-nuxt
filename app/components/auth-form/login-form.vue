<script lang="ts" setup>
import type { LoginInterface } from '#shared/interfaces/login.interface'
import type { FetchError } from 'ofetch'
import type { ErrorInterface } from '#shared/interfaces/error.interface'
import { useToastStore } from '~/stores/toast.store'

const createLoginData = (): LoginInterface => ({
  email: '',
  password: '',
  rememberUser: false
})

const loginData = ref<LoginInterface>(createLoginData())

const toastStore = useToastStore()

const loginUser = async () => {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: loginData.value
    }).then(res => {
      if (res.statusCode === 200) {
        toastStore.showToast('success', 'Вы успешно вошли')
        navigateTo('/')
      }
    })
  } catch (error: unknown) {
    const errorInfo = error as FetchError<ErrorInterface>
    toastStore.showToast('error', errorInfo.data?.message || 'Что-то пошло не так...')
  } finally {
    loginData.value = createLoginData()
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__form">
      <InputField
        v-model="loginData.email"
        placeholder="Email"
        type="email"
        variant="transparent"
      />
      <InputPassword
        v-model="loginData.password"
        placeholder="Пароль"
      />
    </div>
    <label class="auth__additional-info" for="additional-info">
      <input
        id="additional-info"
        v-model="loginData.rememberUser"
        type="checkbox"
      />
      <span>Запомнить меня</span>
    </label>
    <div class="auth__actions">
      <ActionButton variant="primary" @click="loginUser">
        Вход
      </ActionButton>
      <NuxtLink to="/auth/restore">Забыли пароль?</NuxtLink>
    </div>
  </div>
</template>

<style scoped src="./auth-form.css">

</style>
