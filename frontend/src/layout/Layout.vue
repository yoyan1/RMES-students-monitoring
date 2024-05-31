<script setup>
import { RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue';
</script>
<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <Navbar/>
        <Sidebar/>
        
        <RouterView/>
    </div>
</template>