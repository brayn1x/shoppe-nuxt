<script setup lang="ts">
const { isVisible } = defineProps<{
	isVisible: boolean
}>()
</script>

<template>
	<Transition name="fade">
		<Teleport to="body">
			<div v-if="isVisible" class="toast-cover">
				<div class="toast">
					<slot />
				</div>
			</div>
		</Teleport>
	</Transition>
</template>

<style scoped src="./ToastMessage.css">

</style>