<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { ProductService } from '@/service/productService';
import { useCollection } from "vuefire"
import { collection } from "firebase/firestore"
import { db } from "@/firebaseConfig/config"

const students = useCollection(collection(db, 'students'))

const op = ref()
const visible = ref(false)

const toggle = (event) => {
    op.value.toggle(event);
}

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const getOrderSeverity = (status) => {
    switch (status) {
        case 'Present':
            return 'success';

        case 'Out of school':
            return 'danger';

        default:
            return null;
    }
};

const calculateAge = (birthDate) => {
    var today = new Date();
    var birthDate = new Date(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

</script>
<template>
    <div>
        <h1 class="text-2xl">Students</h1>
        <div class="border-2 border-gray-100 rounded-lg dark:border-gray-600 h-96 mb-4">
            <div class="card">
                <DataTable :value="students" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem" >
                    <template #header>
                        <div class="flex justify-end">
                            <span class="relative">
                                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                                <InputText v-model="filters['global'].value"  placeholder="Keyword Search"  class="pl-10 font-normal"/>
                            </span>
                        </div>
                    </template>
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>
                    <Column field="id" header="Student ID"></Column>
                    <Column header="Name">
                        <template #body="slotProps">
                            <div class="flex gap-2 items-center">
                                <img :src="slotProps.data.imageUrl" :alt="slotProps.data.imageUrl" class="shadow-lg h-10 w-10 rounded-full" />
                                <span>{{ slotProps.data.fullname }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="lrn" header="LRN"></Column>
                    <Column field="level" header="Grade Level">
                        <template #body="slotProps">
                            <span>Grade {{ slotProps.data.level }}</span>
                        </template>
                    </Column>
                    <Column field="date_of_birth" header="Age">
                        <template #body="slotProps">
                            <span>{{ calculateAge(slotProps.data.date_of_birth) }}</span>
                        </template>
                    </Column>
                    <Column field="status" header="Status" sortable>
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status" :severity="getOrderSeverity(slotProps.data.status)" />
                        </template>
                    </Column>
                    <Column header="Actions" class="text-center">
                        <template #body="{ data }">
                            <i class="pi pi-ellipsis-v cursor-pointer" @click="toggle"></i>
                            <OverlayPanel ref="op">
                                <div
                                    class="z-10 w-28 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <a href="#"
                                                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                @click="visible = true">Show</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                        </li>
                                    </ul>
                                </div>
                            </OverlayPanel>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
                <template #header>
                    <div class="inline-flex items-center justify-center gap-2">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold white-space-nowrap">Amy Elsner</span>
                    </div>
                </template>
                <span class="text-surface-600 dark:text-surface-0/70 block mb-5">Update your information.</span>
                <div class="flex items-center gap-3 mb-3">
                    <label for="username" class="font-semibold w-[6rem]">Username</label>
                    <InputText id="username" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex items-center gap-3 mb-2">
                    <label for="email" class="font-semibold w-[6rem]">Email</label>
                    <InputText id="email" class="flex-auto" autocomplete="off" />
                </div>
                <template #footer>
                    <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                    <Button label="Save" outlined severity="secondary" @click="visible = false" autofocus />
                </template>
            </Dialog>
        </div>
    </div>
</template>