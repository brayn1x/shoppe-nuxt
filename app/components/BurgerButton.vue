<script lang="ts" setup>
const { isActive } = defineProps<{ isActive: boolean }>()

const emit = defineEmits(['toggle'])
</script>

<template>
	<nav class="navbar" @click="emit('toggle')">
		<div :class="['burger-btn', {'active': isActive}]">
			<span />
		</div>
	</nav>
</template>

<style scoped>
.navbar {
	display: flex;
	align-items: center;
}

.burger-btn {
	position: relative;

	width: 20px;
	height: 14px;

	cursor: pointer;
}

.burger-btn:before,
.burger-btn:after,
.burger-btn span {
	position: absolute;

	height: 2px;

	background: var(--color-black);
	border-radius: 10px;
	transition: all 0.2s ease;
}

.burger-btn:before {
	content: '';
	top: 0;

	width: 20px;
}

.burger-btn span {
	top: 6px;

	width: 20px;
}

.burger-btn:after {
	content: '';
	bottom: 0;
	right: 0;

	width: 14px;
}

.burger-btn.active:before {
	top: 6px;

	transform: rotate(45deg);
}

.burger-btn.active span {
	transform: rotate(-45deg);
}

.burger-btn.active:after {
	display: none;
}
</style>