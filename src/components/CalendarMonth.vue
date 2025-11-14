<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: [
    { title: 'Meeting Tim', start: '2025-11-12' },
    { title: 'Review Project', start: '2025-11-18' }
  ]
}
</script>

<template>
  <div class="p-4">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
