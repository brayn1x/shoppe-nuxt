<script lang="ts" setup>
const email = ref('')

const toastStore = useToastStore()

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
			variant="transparent"
      @ok="toastStore.showToast('success', 'Ваш email подписан на новости и уведомления')"
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
	</footer>
</template>

<style scoped src="./layout-footer.css">

</style>
