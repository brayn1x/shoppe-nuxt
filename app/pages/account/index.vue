<script lang="ts" setup>
useSeoMeta({
	title: 'Аккаунт',
	description: 'Аккаунт пользователя'
})

const logout = async () => {
  await $fetch('/api/auth/logout', {
    method: 'POST'
  })
  navigateTo('/auth/login')
}
</script>

<template>
  <div>
    <div>account</div>
    <button @click="logout">Выйти</button>
  </div>
</template>

<style scoped>

</style>
