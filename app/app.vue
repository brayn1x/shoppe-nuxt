<script lang="ts" setup>
const toastStore = useToastStore()
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
    <ToastMessage :is-visible="toastStore.isToastVisible">
      <Icon v-if="toastStore.toastType === 'success'" name="icons:check" size="20" />
      <Icon v-if="toastStore.toastType === 'error'" name="icons:error" size="24" />
      {{ toastStore.toastMessage }}
    </ToastMessage>
	</NuxtLayout>
</template>

<style scoped src="./assets/styles/app.css">

</style>
