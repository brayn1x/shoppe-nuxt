import { defineStore } from 'pinia'

export const useToastStore = defineStore('useToast', () => {
  type toastType = 'success' | 'error'

  const isToastVisible = ref(false)
  const toastMessage = ref('')
  const toastType = ref<toastType>('success')

  let timer: ReturnType<typeof setTimeout> | null = null

  const showToast = (type: toastType, message: string, duration = 3000) => {
    isToastVisible.value = true
    toastType.value = type
    toastMessage.value = message

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      isToastVisible.value = false
      timer = null
    }, duration)
  }

  return { isToastVisible, toastType, toastMessage, showToast }
})
