<template>
  <div id="map" style="width: 100%; height: 100vh; margin: 0; padding: 0"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TileLayerWithHeaders'; 

const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsInJvbGVJZCI6IjIzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsInRva2VuIjoiQzdDQTg5NUFFRTdBNTRCM0E3QTAzRUVDMUZCN0FCMTAifQ.YUfJZAGV5ZAOB8u85ivQW-l_iCiqPWthrsk3IVdknjk'; // Замените на ваш Bearer токен


onMounted(() => {
    const map = L.map('map').setView([45.03668, 41.9171], 13);

    // Проверяем, что L.TileLayerWithHeaders работает, иначе используем стандартный tileLayer
    const tileLayer = new L.TileLayerWithHeaders('http://localhost:5000/v1/telemetry/map?mapApiUrl&z={z}&x={x}&y={y}', {
    maxZoom: 19,
    bearerToken: bearerToken 
  });
    
    tileLayer.addTo(map);

    const marker = L.marker([45.03668, 41.9171]).addTo(map);
    marker.bindPopup('Это моя метка!').openPopup();
});



// const latlng = L.LatLng(45.03668, 41.9171)
//   const map = L.map('map').setView([45.03668, 41.9171], 13);
//   const tileLayer = new L.TileLayerWithHeaders('http://localhost:5000/v1/telemetry/map?mapApiUrl&z={z}&x={x}&y={y}', {
//     maxZoom: 19,
//     bearerToken: bearerToken 
//   });
//   tileLayer.addTo(map);
//   const marker = L.marker([45.03668, 41.9171]).addTo(this.map);
//   marker.bindPopup('Это моя метка!').openPopup();


</script>
