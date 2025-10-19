import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore(
  'app',
  () => {
    const language = ref('')

    return { language }
  },
  {
    persist: true
  }
)
