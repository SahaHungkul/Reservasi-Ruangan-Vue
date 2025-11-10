<script setup>
import Footer from '@/components/Footer.vue';
import { onMounted, ref } from 'vue';
import reservationService from '@/services/reservationService';
import roomService from '@/services/RoomService';
import { useRouter } from 'vue-router';
import { CalendarPlus } from 'lucide-vue-next';

const reservations = ref([]);
const rooms = ref([]);
const status = ref(['approved', 'pending', 'rejected', 'canceled']);
const loading = ref(false);
const error = ref(null);
const router = useRouter();


const fetchReservation = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await reservationService.getReservations();
    reservations.value = res.data.data ?? res.data;
  } catch (err) {
    console.error("❌ Error fetching reservations:", err);
    error.value = err.response?.data?.message || "Terjadi kesalahan saat mengambil data reservasi.";
  } finally {
    loading.value = false;
  }
}

const fetchRooms = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await roomService.getRooms();
    rooms.value = res.data.data ?? res.data;
  } catch (err) {
    console.error("❌ Error fetching rooms:", err);
    error.value = err.response?.data?.message || "Terjadi kesalahan saat mengambil data ruangan.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchReservation();
  fetchRooms();
})
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-bold mb-4 text-black border p-5 rounded-md">Daftar Reservasi</h1>

    <!-- <RouterLink to="/admin/user/create" class="p-2 flex item-center w-fit bg-blue-500 text-white rounded">
      <UserPlus class="mr-1" />
      Tambah
    </RouterLink> -->
    <div class="flex items-center mt-10">
      <select class="bg-cyan-700 text-white p-2 rounded mr-2 w-fit">
        <option value="" disabled selected>Ruangan</option>
        <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.name }}</option>
      </select>
      <select name="" id="" class="bg-cyan-700 p-2 mr-2 rounded text-white ">
        <option value="" disabled selected>Status</option>
        <option v-for="s in status" :key="s" :value="s">{{ s }}</option>
      </select>
      <!-- <input type="date" class="bg-cyan-700 p-2 rounded text-white mr-2" /> -->
      <button class="bg-cyan-700 p-2 flex items-center rounded text-white mr-2">
        <CalendarPlus class="mr-1" />
        Pilih Tanggal
      </button>
      <button class="bg-cyan-700 p-2 rounded text-white">Export Laporan (CSV/Excel)</button>
    </div>

    <div class="overflow-x-auto bg-white shadow-sm border border-gray-200 mt-4">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-cyan-700 text-white">
          <tr>
            <th class="px-5 py-3 font-medium text-sm text-center">Tanggal</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Ruangan</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Jam</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Status</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="r in reservations" :key="r.id">
            <td class="text-center py-3">{{ r.date }}</td>
            <td class="text-center py-3">{{ r.room?.name }}</td>
            <td class="text-center py-3">{{ r.start_time }} - {{ r.end_time }}</td>
            <td class="text-center py-3">{{ r.status }}</td>
            <td class="text-center py-3">
              <div class="flex justify-center gap-2">
                <RouterLink class="bg-blue-500 p-2 rounded text-white">Setujui
                </RouterLink>
                <button class="bg-red-500 rounded text-white p-2 cursor-pointer">
                  Tolak
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="-mx-8">
    <Footer />
  </div>
</template>
