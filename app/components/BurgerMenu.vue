<script lang="ts" setup>
const { isVisible } = defineProps<{ isVisible: boolean }>()

const textLinks = [
	{ id: 1, href: '/', label: 'Главная' },
	{ id: 2, href: '/products', label: 'Магазин' },
	{ id: 3, href: '/about', label: 'О нас' }
]

const iconLinks = [
	{ id: 1, href: '/account', name: 'icons:user', label: 'Мой аккаунт' },
	{ id: 2, href: '/favorites', name: 'icons:favorite', label: 'Мой избранное' },
	{ id: 3, href: '#', name: 'icons:exit', label: 'Выход' }
]
</script>

<template>
	<ul :class="['menu', { 'active': isVisible }]">
		<li v-for="item in textLinks" :key="item.id">
			<NuxtLink :to="item.href">{{ item.label }}</NuxtLink>
		</li>
		<hr />
		<li v-for="item in iconLinks" :key="item.id">
			<NuxtLink :to="item.href">
				<Icon :name="item.name" size="20" />
				{{ item.label }}
			</NuxtLink>
		</li>
	</ul>
</template>

<style scoped>
.menu {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;

	display: flex;
	flex-direction: column;
	gap: 24px;
	width: 100%;
	height: 100vh;
	padding-left: 16px;
	margin-top: 85px;
	padding-top: 40px;

	transform: translatex(100%);
	transition: transform 0.2s ease;
	background: var(--color-white);
	overflow: hidden;
}

.menu.active {
	transform: translateY(0);
}

.menu li {
	padding: 0;

	list-style: none;
}

.menu li a {
	display: flex;
	align-items: center;
	gap: 10px;

	font-size: 20px;
}

.menu li *:hover {
	color: var(--color-dove-gray);
}

.menu hr {
	width: 100%;
	height: 1px;

	background: var(--color-alto);
	border: 0;
}
</style>