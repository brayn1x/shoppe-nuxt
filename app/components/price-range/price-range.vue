<script lang="ts" setup>
const { min, max } = defineProps<{
  min: number;
  max: number;
}>()

const range = defineModel<[number, number]>({
  required: true
})

const updateMin = (event: Event) => {
  const newMin = Number((event.target as HTMLInputElement).value)
  const [, currentMax] = range.value
  range.value = [Math.min(newMin, currentMax), currentMax]
}

const updateMax = (event: Event) => {
  const newMax = Number((event.target as HTMLInputElement).value)
  const [currentMin] = range.value
  range.value = [currentMin, Math.max(newMax, currentMin)]
}

const trackStyle = computed(() => {
  const minPercent = ((range.value[0] - min) / (max - min)) * 100
  const maxPercent = ((range.value[1] - min) / (max - min)) * 100

  return {
    background: `linear-gradient(to right,
     var(--color-alto) 0%,
     var(--color-alto) ${minPercent}%,
     var(--color-black) ${minPercent}%,
     var(--color-black) ${maxPercent}%,
     var(--color-alto) ${maxPercent}%,
     var(--color-alto) 100%)`
  }
})
</script>

<template>
  <div class="price-range">
    <div class="range-wrapper">
      <input
        :max
        :min
        :style="trackStyle"
        :value="range[0]"
        type="range"
        @input="updateMin"
      />
      <input
        :max
        :min
        :style="trackStyle"
        :value="range[1]"
        type="range"
        @input="updateMax"
      />
    </div>
    <div class="price-info">Цена: ${{ range[0] }} - ${{ range[1] }}</div>
  </div>
</template>

<style scoped src="./price-range.css">

</style>
