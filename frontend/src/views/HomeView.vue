
<template>
  <div class="card flex justify-center">
    <Button label="Multiple" severity="warning" @click="showMultiple()" />
  </div>
  <Toast />
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const showMultiple = () => {
  toast.add({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3050 });
  toast.add({ severity: 'warn', summary: 'Warning', detail: 'Message Content', life: 3100 });
  toast.add({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3150 });
};
</script>
