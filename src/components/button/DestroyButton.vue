<script setup>
import { Button } from '@/components/ui/button';
import { X } from 'lucide-vue-next';

defineProps({
  size: {
    type: String,
    default: 'sm' // 'sm', 'default', 'lg'
  },
  variant: {
    type: String,
    default: 'destructive'
  }
})

</script>

<template>
  <Button :variant="variant" :size="size"
    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs transition cursor-pointer">
    <slot>
      <X class="w-4 h-4" />
    </slot>
  </Button>
</template>

<style scoped></style>
