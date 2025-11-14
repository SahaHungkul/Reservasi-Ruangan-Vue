<script setup>
import { ref, onMounted } from 'vue'
import reservationService from '@/services/reservationService'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

const events = ref([])
const selectedDate = ref(null)
const selectedEvents = ref([])
const showModal = ref(false)
const showDropdown = ref(false)
const dropdownPosition = ref({ top: 0, left: 0 })

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,dayGridDay'
  },
  events: events.value,

  dateClick(info) {
    const date = info.dateStr
    selectedDate.value = date
    const calendarEvents = info.view.calendar.getEvents()

    selectedEvents.value = calendarEvents.filter(ev => ev.startStr === date)

    // Posisi dropdown
    const rect = info.dayEl.getBoundingClientRect()
    dropdownPosition.value = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    }

    showDropdown.value = true
  },

  eventColor: '#1976d2',
  dayMaxEvents: true,
})

const fetchReservations = async () => {
  const res = await reservationService.getReservations()
  const list = res.data.data || []

  events.value = list.map(item => ({
    title: `${item.user?.name} - ${item.room?.name}`,
    start: item.date,
    allDay: true,
    id: item.id,
    extendedProps: {
      startTime: item.start_time,
      endTime: item.end_time,
      user: item.user,
      room: item.room,
    }
  }))

  // update calendar
  calendarOptions.value.events = events.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const showDetailModal = () => {
  showDropdown.value = false
  showModal.value = true
}

const addReservation = () => {
  showDropdown.value = false
  // TODO: Navigate ke halaman tambah reservasi atau buka modal form
  console.log('Tambah reservasi untuk tanggal:', selectedDate.value)
  alert(`Tambah reservasi untuk tanggal: ${selectedDate.value}`)
}

const closeModal = () => {
  showModal.value = false
}

onMounted(fetchReservations)
</script>

<template>
  <div class="p-4">

    <!-- Kalender -->
    <FullCalendar :options="calendarOptions" />

    <!-- Dropdown Menu -->
    <Transition name="fade">
      <div
        v-if="showDropdown"
        class="fixed inset-0 z-40"
        @click="closeDropdown"
      >
        <div
          class="absolute bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px]"
          :style="{ top: dropdownPosition.top + 'px', left: dropdownPosition.left + 'px' }"
          @click.stop
        >
          <!-- Opsi jika ada reservasi -->
          <template v-if="selectedEvents.length > 0">
            <button
              @click="showDetailModal"
              class="w-full px-4 py-2 text-left hover:bg-gray-100 transition flex items-center gap-3"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-gray-700">Info Detail Reservasi</span>
            </button>
            <div class="border-t border-gray-200 my-1"></div>
          </template>

          <!-- Opsi Tambah Reservasi (selalu muncul) -->
          <button
            @click="addReservation"
            class="w-full px-4 py-2 text-left hover:bg-gray-100 transition flex items-center gap-3"
          >
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="text-gray-700">Tambah Reservasi</span>
          </button>

          <div class="border-t border-gray-200 my-1"></div>

          <!-- Opsi Batal (selalu muncul) -->
          <button
            @click="closeDropdown"
            class="w-full px-4 py-2 text-left hover:bg-gray-100 transition flex items-center gap-3"
          >
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="text-gray-700">Batal</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Modal Detail -->
    <div v-if="showModal" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">

        <!-- Header -->
        <div class="px-5 py-3 border-b flex justify-between items-center bg-gray-50">
          <h3 class="font-bold text-lg">Detail Reservasi</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <!-- Konten -->
        <div class="p-5">
          <p class="text-gray-700 font-medium mb-4">
            Tanggal: {{ selectedDate }}
          </p>

          <!-- Jika ada reservasi -->
          <table v-if="selectedEvents.length" class="w-full text-left border">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-2 border">Nama</th>
                <th class="p-2 border">Jam</th>
                <th class="p-2 border">Ruangan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in selectedEvents" :key="event.id" class="border">
                <td class="p-2 border">{{ event.extendedProps.user?.name }}</td>
                <td class="p-2 border">
                  {{ event.extendedProps.startTime }} - {{ event.extendedProps.endTime }}
                </td>
                <td class="p-2 border">{{ event.extendedProps.room?.name }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Jika tidak ada reservasi -->
          <p v-else class="text-gray-500">Tidak ada reservasi pada tanggal ini.</p>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t flex justify-end bg-gray-50">
          <button class="px-4 py-2 rounded bg-teal-700 text-white hover:bg-teal-800" @click="closeModal">
            Tutup
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
