<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <aside :class="[
    // posisi dan tampilan dasar sidebar
    'fixed top-[64px] left-0 h-[calc(100vh-64px)] w-50 bg-cyan-700 border-r border-gray-200 shadow-md z-40 transition-transform duration-300',
  ]">
    <div class="mt-10">
      <ul class="space-y-2">
        <li>
          <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center w-full p-2 text-gray-200">
            <LayoutDashboard class="text-inherit" />
            <span class="ml-1 text-xl">Dashboard</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="flex items-center w-full p-2 text-gray-200"
            active-class="bg-neutral-400 font-semibold text-white" exact-active-class="bg-gray-800 text-white">
            <FileText class="text-inherit" />
            <span class="ml-1 text-xl">Reservasi</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'RoomIndex' }" class="flex items-center p-2 text-gray-200"
            active-class="bg-neutral-400 font-semibold text-white" exact-active-class="bg-gray-800 text-white">
            <DoorOpen class="text-inherit" />
            <span class="ml-1 text-xl">Ruangan</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="flex items-center p-2 text-gray-200">
            <User class="text-inherit" />
            <span class="ml-1 text-xl">User</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="flex items-center p-2 text-gray-200">
            <CalendarRange class="text-inherit" />
            <span class="ml-1 text-xl">Jadwal Tetap</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { LayoutDashboard, FileText, DoorOpen, User, CalendarRange } from 'lucide-vue-next';

defineProps({
  isOpen: Boolean
})
</script>
