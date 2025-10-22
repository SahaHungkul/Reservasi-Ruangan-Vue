<script setup>
import { Button } from '@/components/ui/button'
// import { Pencil } from 'lucide-vue-next'

// Props agar fleksibel
defineProps({
  size: {
    type: String,
    default: 'md', // sm | md | lg
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  variant: {
    type: String,
    default: 'primary' // primary | outline | ghost
  },
  label: {
    type: String,
    default: 'Edit'
  }
})
</script>

<template>
  <Button :class="[
    variant === 'primary' && 'bg-[#006989] text-white hover:bg-[#00506d]',
    variant === 'outline' && 'border border-[#006989] text-[#006989] hover:bg-[#e0f7fa]',
    variant === 'ghost' && 'text-[#006989] hover:bg-[#f0f9f9]',
    size === 'sm' && 'px-2 py-1 text-sm',
    size === 'md' && 'px-3 py-2 text-base',
    size === 'lg' && 'px-4 py-3 text-lg',
    'bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs transition cursor-pointer'
  ]">
    <!-- <Pencil class="w-4 h-4" /> -->
    <span>{{ label }}</span>
  </Button>
</template>
