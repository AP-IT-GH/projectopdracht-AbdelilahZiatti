document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const map = L.map('map').setView([51.2194, 4.4025], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    
    const customIcon = L.icon({
        iconUrl: 'assets/logo.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const antwerp = L.marker([51.2194, 4.4025], { icon: customIcon }).addTo(map);
    antwerp.bindPopup("Antwerpen");

    const brussels = L.marker([50.8503, 4.3517], { icon: customIcon }).addTo(map);
    brussels.bindPopup("Brussel");
});
