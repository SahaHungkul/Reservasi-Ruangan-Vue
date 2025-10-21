<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <aside
    class="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-50 bg-cyan-700 border-r border-gray-200 shadow-md z-40 transition-transform duration-300"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
    <div class="mt-10">
      <ul class="space-y-2">
        <li>
          <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center w-full p-2 text-gray-200  hover:bg-cyan-800">
            <LayoutDashboard class="text-gray-200 " />
            <span class="ml-1 text-xl">Dashboard</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="flex items-center w-full p-2 text-gray-200 hover:bg-cyan-800">
            <FileText class="text-gray-200" />
            <span class="ml-1 text-xl">Reservasi</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="flex items-center p-2 text-gray-200 hover:bg-cyan-800">
            <DoorOpen class="text-gray-200" />
            <span class="ml-1 text-xl">Ruangan</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="flex items-center p-2 text-white hover:bg-neutral-400">
            <User class="text-white" />
            <span class="ml-1 text-xl">User</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="flex items-center p-2 text-gray-200 hover:bg-gray-800">
            <CalendarRange class="text-gray-200" />
            <span class="ml-1 text-xl">Jadwal Tetap</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { LayoutDashboard } from 'lucide-vue-next';
import { FileText } from 'lucide-vue-next';
import { DoorOpen } from 'lucide-vue-next';
import { User } from 'lucide-vue-next';
import { CalendarRange } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean
})
</script>
