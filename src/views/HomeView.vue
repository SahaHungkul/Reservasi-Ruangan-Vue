<script setup>
import { ref, onMounted, computed } from 'vue'
import reservationService from '@/services/reservationService'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

const events = ref([])

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth'
  },
  events: events.value,
  eventColor: '#1976d2',
  eventDisplay: 'list-item', // atau 'block' untuk tampilan berbeda
  dayMaxEvents: true, // Batasi jumlah event yang ditampilkan
}))

const fetchReservations = async () => {
  try {
    const res = await reservationService.getReservations()
    const list = res.data.data?.data || res.data.data || res.data || []

    events.value = list.map(item => ({
      title: `${item.user?.name} - ${item.room?.name}`,
      start: item.date, // Hanya tanggal, tanpa waktu
      allDay: true, // Tandai sebagai all-day event
      id: item.id,
      backgroundColor: '#1976d2',
      extendedProps: {
        startTime: item.start_time,
        endTime: item.end_time,
        room: item.room,
        user: item.user
      }
    }))

    console.log('Events:', events.value)
  } catch (err) {
    console.error('Error:', err)
  }
}

onMounted(fetchReservations)
</script>

<template>
  <div class="p-4">
    <h2 class="text-lg font-bold mb-4">Jadwal Reservasi Ruangan</h2>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
