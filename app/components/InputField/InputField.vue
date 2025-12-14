<script lang="ts" setup>
const { type = 'ghost', iconPosition = 'right', placeholder = '' } = defineProps<{
	type?: 'transparent' | 'ghost',
	iconPosition?: 'left' | 'right',
	placeholder?: string
}>()

const model = defineModel<string>({
	required: true
})

const emit = defineEmits<{
	(e: 'ok'): void
}>()
</script>

<template>
	<div :class="['input', {[type]: type}]">
		<input
			v-model="model"
			:placeholder
			class="input__field"
			type="text"
		>
		<button :class="['input__icon', {[iconPosition]: iconPosition}]" @click="emit('ok')">
			<slot />
		</button>
	</div>
</template>

<style scoped src="./InputField.css">

</style>