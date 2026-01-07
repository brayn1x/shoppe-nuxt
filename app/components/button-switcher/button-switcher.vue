<script lang="ts" setup>
const model = defineModel<boolean>({
  required: true
})

const toggleValue = () => {
  model.value = !model.value
}
</script>

<template>
  <div :class="['switcher', {'switcher-active': modelValue}]" @click="toggleValue">
    <div :class="['switcher-circle', {'switcher-circle-active': modelValue}]"></div>
  </div>
</template>

<style scoped src="./button-switcher.css">

</style>
