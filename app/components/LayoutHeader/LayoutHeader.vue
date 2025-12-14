<script lang="ts" setup>
import IconLogo from '~/components/icons/IconLogo.vue'

const textLinks = [
	{ id: 1, href: '/products', label: 'Магазин' },
	{ id: 2, href: '/about', label: 'О нас' }
]

const iconLinks = [
	{ id: 1, href: '#', name: 'icons:search' },
	{ id: 2, href: '/cart', name: 'icons:cart' },
	{ id: 3, href: '/favorites', name: 'icons:favorite' },
	{ id: 4, href: '/account', name: 'icons:user' }
]

const isOpened = ref(false)
const search = ref('')

watch(isOpened, () => {
	if (isOpened.value === true) {
		document.body.classList.add('modal-open')
	} else {
		document.body.classList.remove('modal-open')
	}
})

const toggleIsOpened = () => {
	isOpened.value = !isOpened.value
}
</script>

<template>
	<header class="header">
		<div class="navbar">
			<NuxtLink to="/">
				<IconLogo />
			</NuxtLink>
			<div class="navbar__icons">
				<NuxtLink to="/cart">
					<Icon name="icons:cart" size='18' />
				</NuxtLink>
				<BurgerButton :is-active="isOpened" @toggle="toggleIsOpened" />
			</div>
		</div>
		<div class="search">
			<InputField v-model="search" icon-position="left" placeholder="Поиск">
				<Icon name="icons:search" size='12' />
			</InputField>
		</div>
		<div class="menu-mobile">
			<BurgerMenu :is-visible="isOpened" />
		</div>
		<div class="menu-desktop">
			<ul class="text-links">
				<li v-for="item in textLinks" :key="item.id">
					<NuxtLink :to="item.href" active-class="active-link">{{ item.label }}</NuxtLink>
				</li>
			</ul>
			<div class="vertical-line" />
			<ul class="icon-links">
				<li v-for="item in iconLinks" :key="item.id">
					<NuxtLink :to="item.href" active-class="active-link">
						<Icon :name="item.name" size='18' />
					</NuxtLink>
				</li>
			</ul>
		</div>
	</header>
</template>

<style scoped src="./LayoutHeader.css">

</style>