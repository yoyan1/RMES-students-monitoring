import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebaseConfig/config';

import Aura from './presets/Aura';
import ToastService from 'primevue/toastservice';

// components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import OverlayPanel from 'primevue/overlaypanel';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import InputMask from 'primevue/inputmask';
import FileUpload from 'primevue/fileupload';
import PanelMenu from 'primevue/panelmenu';
import Menu from 'primevue/menu';

const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Aura
})

app.component('InputMask', InputMask)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Calendar', Calendar)
app.component('InputNumber', InputNumber)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('MultiSelect', MultiSelect)
app.component('Button', Button)
app.component('ProgressBar', ProgressBar)
app.component('Tag', Tag)
app.component('Dropdown', Dropdown)
app.component('Slider', Slider)
app.component('OverlayPanel', OverlayPanel)
app.component('Toast', Toast)
app.component('Dialog', Dialog)
app.component('FileUpload', FileUpload)
app.component('PanelMenu', PanelMenu)
app.component('Menu', Menu)

app.use(ToastService);
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
app.mount('#app')
