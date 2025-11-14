<script setup>
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarOptions = {
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: 'timeGridDay',
  allDaySlot: false,
  events: [
    { title: 'Interview Kandidat', start: '2025-11-12T09:00:00', end: '2025-11-12T10:00:00' },
    { title: 'Rapat Internal', start: '2025-11-12T14:00:00', end: '2025-11-12T15:00:00' }
  ]
}
</script>

<template>
  <div class="p-4">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
