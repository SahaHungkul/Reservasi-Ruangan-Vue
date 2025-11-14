<script setup>
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarOptions = {
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  nowIndicator: true,
  slotMinTime: '07:00:00',
  slotMaxTime: '20:00:00',
  events: [
    { title: 'Rapat Tim', start: '2025-11-12T10:00:00', end: '2025-11-12T11:00:00' },
    { title: 'Presentasi', start: '2025-11-13T13:00:00', end: '2025-11-13T14:00:00' }
  ]
}
</script>

<template>
  <div class="p-4">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
