<script setup>
import { RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue';
</script>
<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <Navbar/>
        <Sidebar/>
        <main class="p-4 md:ml-64 h-auto pt-20 bg-white">
            <RouterView/>
        </main>
    </div>
</template>