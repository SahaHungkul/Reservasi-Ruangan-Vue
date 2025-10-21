<template>
  <div class="min-h-screen bg-gray-50 flex flex-col relative">
    <!-- Navbar -->
    <Navbar @toggle-sidebar="toggleSidebar" />

    <div class="flex flex-1 pt-[64px] relative">
      
      <div v-if="sidebarOpen" class="fixed inset-0 z-30" @click="closeSidebar"></div>

      <!-- Sidebar -->
      <Sidebar :isOpen="sidebarOpen" class="z-40" />

      <!-- Konten utama -->
      <main class="flex-1 p-8 transition-all duration-300" :class="{ 'overflow-hidden': sidebarOpen }"
        @click="handleMainClick">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const handleMainClick = () => {
  if (sidebarOpen.value) closeSidebar();
};
</script>
