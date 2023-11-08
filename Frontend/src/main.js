import './assets/main.css'

import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './axios'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken = 'pk.eyJ1IjoibWllcmVzNyIsImEiOiJjbG9venFwNnAwMnZ0MmpuMGRrYmxqbHY4In0.elUDQBRikqmf8BUrLtUyhA';

const app = createApp(App)

app.use(router)

app.mount('#app')

