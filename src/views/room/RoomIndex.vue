<script setup>
import Table from '@/components/Table.vue'
import Footer from '@/components/Footer.vue'
import { HousePlus } from 'lucide-vue-next';

const columns = [
  { label: 'No', field: 'id' },
  { label: 'Nama', field: 'name' },
  { label: 'Kapasitas', field: 'capacity' },
  { label: 'Keterangan', field: 'description' },
  { label: 'Status', field: 'status' },
]

const rows = [
  { id: 1, name: 'Muhammad Hasby', capacity: '30', description: '-', status: 'nonaktif' },
]
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-bold mb-4 text-black border p-5 rounded-md">Daftar Ruangan</h1>
    <RouterLink :to="{ name: 'RoomCreate' }"
      class="flex items-center bg-cyan-700 text-slate-50 p-2 w-fit rounded hover:bg-cyan-800 transition">
      <HousePlus class="mr-1" />
      Tambah
    </RouterLink>
    <Table :columns="columns" :rows="rows" />
  </div>

  <!-- Footer keluar dari padding utama -->
  <div class="-mx-8">
    <Footer />
  </div>
</template>
