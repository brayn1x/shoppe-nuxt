<script lang="ts" setup>
const { type = 'ghost', iconPosition = 'right', placeholder = '' } = defineProps<{
	type?: 'transparent' | 'ghost',
	iconPosition?: 'left' | 'right',
	placeholder?: string
}>()

const model = defineModel<string>({
	required: true
})
</script>

<template>
	<div :class="['input', {[type]: type}]">
		<input
			v-model="model"
			:placeholder
			class="input__field"
			type="text"
		>
		<div :class="['input__icon', {[iconPosition]: iconPosition}]">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.input {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
}

.input.ghost {
	padding: 5px 10px;

	background: var(--color-gallery);
	border-radius: 4px;
}

.input.transparent {
	padding: 5px 0;

	background: transparent;
	border-bottom: 1px solid var(--color-black);
}

.input__field {
	width: 100%;
	background: inherit;
	border-radius: inherit;
}

.input__field::placeholder {
	font-weight: 500;
}

.input__icon.left {
	order: -1
}
</style>