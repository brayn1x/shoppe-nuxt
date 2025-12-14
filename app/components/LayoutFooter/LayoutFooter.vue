<script lang="ts" setup>
const email = ref('')
const isToastVisible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const showToast = () => {
	isToastVisible.value = true

	if (timer) clearTimeout(timer)

	timer = setTimeout(() => {
		isToastVisible.value = false
		timer = null
	}, 3000)
}

const textLinks = [
	{ id: 1, href: '#', label: 'Контакты' },
	{ id: 2, href: '#', label: 'Условия покупки' },
	{ id: 3, href: '#', label: 'Доставка и возврат' }
]

const socialsLinks = [
	{ id: 1, href: '#', name: 'icons:linkedin' },
	{ id: 2, href: '#', name: 'icons:facebook' },
	{ id: 3, href: '#', name: 'icons:instagram' },
	{ id: 4, href: '#', name: 'icons:twitter' }
]
</script>

<template>
	<footer class="footer">
		<InputField
			v-model="email"
			class="footer-form"
			placeholder="Ваш email для акций и предложений"
			type="transparent"
			@ok="showToast"
		>
			<Icon name="icons:arrow-right" size="8" />
		</InputField>
		<ul class="footer__links">
			<li v-for="item in textLinks" :key="item.id">
				<NuxtLink :to="item.href">{{ item.label }}</NuxtLink>
			</li>
		</ul>
		<ul class="footer__socials">
			<li v-for="item in socialsLinks" :key="item.id">
				<NuxtLink :to="item.href">
					<Icon :name="item.name" />
				</NuxtLink>
			</li>
		</ul>
		<div class="footer__copyright">© {{ new Date().getFullYear() }} Shoppe</div>
		<ToastMessage :is-visible="isToastVisible">
			<Icon name="icons:check" size="20" />
			Ваш email подписан на новости и уведомления
		</ToastMessage>
	</footer>
</template>

<style scoped src="./LayoutFooter.css">

</style>