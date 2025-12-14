<script lang="ts" setup>

</script>

<template>
	<div class="wrapper">
		<LayoutHeader />
		<main class="main">
			<slot />
		</main>
		<LayoutFooter />
	</div>
</template>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	max-width: 1248px;
	height: 100vh;
	padding: 16px;
	margin: 0 auto;
}

.main {
	flex: 1 1 auto;
	padding: 16px 0;
}

@media (min-width: 1240px) {
	.wrapper {
		padding: 48px 96px;
	}
}
</style>