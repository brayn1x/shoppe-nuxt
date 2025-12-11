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
				<Icon name="icons:cart" size='18' />
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

<style scoped>
.header {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.navbar a:hover {
	opacity: 0.7;
}

.navbar__icons {
	display: flex;
	gap: 16px;
}

.menu-desktop {
	display: none;
}

@media (min-width: 768px) {
	.header {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		border-bottom: 1px solid var(--color-alto);
	}

	.navbar__icons,
	.search,
	.menu-mobile {
		display: none;
	}

	.menu-desktop {
		display: flex;
		align-items: center;
	}

	.vertical-line {
		height: 17px;
		width: 1px;
		margin: 0 60px;

		background: var(--color-dove-gray);
	}

	.text-links {
		display: flex;
		gap: 60px;
		height: 14px;
	}

	.icon-links {
		display: flex;
		gap: 40px;
		height: 26px;
	}

	.text-links li a,
	.icon-links li a {
		color: var(--color-black);
	}

	.text-links li a:hover,
	.icon-links li a:hover {
		color: var(--color-dove-gray);
	}

	.active-link {
		padding-bottom: 16px;
		border-bottom: 2px solid var(--color-black);
	}
}
</style>