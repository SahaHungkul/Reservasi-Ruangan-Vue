<script setup>
import Footer from '@/components/Footer.vue'
import { HousePlus } from 'lucide-vue-next';

import { ref, onMounted } from "vue";
import roomService from "@/services/RoomService";

const rooms = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await roomService.getRooms();
    rooms.value = response.data.data ?? response.data; // tergantung struktur response API
  } catch (err) {
    error.value = err.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-bold mb-4 text-black border p-5 rounded-md">Daftar Ruangan</h1>
    <RouterLink :to="{ name: 'RoomCreate' }"
      class="flex items-center bg-cyan-700 text-slate-50 p-2 w-fit rounded hover:bg-cyan-800 transition">
      <HousePlus class="mr-1" />
      Tambah
    </RouterLink>

    <div class="overflow-x-auto bg-white shadow-sm border border-gray-200 mt-4">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-cyan-700 text-white">
          <tr>
            <th class="px-5 py-3 font-medium text-sm text-center">No</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Name</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Capacity</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Description</th>
            <th class="px-5 py-3 font-medium text-sm text-center">status</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(room, i) in rooms" :key="room.id">
            <td class="text-center py-3">{{ i + 1 }}</td>
            <td class="text-center py-3">{{ room.name }}</td>
            <td class="text-center py-3">{{ room.capacity }}</td>
            <td class="text-center py-3">{{ room.description }}</td>
            <td class="text-center py-3">{{ room.status }}</td>
            <td class="text-center py-3">
              <div class="flex justify-center gap-2">
                <RouterLink :to="`/admin/room/${room.id}/edit`" class="bg-blue-600 p-2 rounded text-white">Edit</RouterLink>
                <button class="bg-red-500 rounded text-white p-2 cursor-pointer">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Footer keluar dari padding utama -->
  <div class="-mx-8">
    <Footer />
  </div>
</template>
