<script lang="ts" setup>
const email = ref('')

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

<style scoped>
.footer__links {
	display: flex;
	flex-direction: column;
	gap: 8px;

	font-size: 12px;
	text-transform: uppercase;

	margin-top: 20px;
	margin-bottom: 36px;
}

.footer__links li a,
.footer__socials li a {
	color: var(--color-dove-gray);
}

.footer__links li a:hover,
.footer__socials li a:hover {
	color: var(--color-black);
}

.footer__socials {
	display: flex;
	gap: 30px;
	margin-bottom: 26px;
}

.footer__copyright {
	font-size: 16px;
}

@media (min-width: 768px) {
	.footer {
		display: grid;
		align-items: center;
		justify-content: space-between;
		gap: 50px;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		padding-top: 30px;

		border-top: 1px solid var(--color-alto);
	}

	.footer__links {
		align-items: center;
		flex-direction: row;
		gap: 30px;
		order: -1;
		margin: 0;

		text-align: center;
	}

	.footer__socials {
		order: 1;
	}
}
</style>