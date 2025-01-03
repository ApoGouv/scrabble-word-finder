import { createApp } from 'vue';
import { createVfm } from 'vue-final-modal';
import 'vue-final-modal/style.css';
import './style.css';
import App from './App.vue';
import Toast, { POSITION } from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';
// Import the vue-toastification CSS
import 'vue-toastification/dist/index.css';

const app = createApp(App);

// Optional toaster options
const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  closeOnClick: true,
};
// Mount the toast plugin
app.use(Toast, options);

// Create the VFM instance
const vfm = createVfm();
// Mount the VFM instance
app.use(vfm);

app.mount('#app');
