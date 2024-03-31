$(document).ready(() => {
    const map = L.map('map').setView([6.821382357635158, 80.04157289503557], 20);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([6.821382357635158, 80.04157289503557]);

    $('.map-item').on('click', function () {
        console.log(this);
        const lat = $(this).data('lat');
        const lng = $(this).data('lng');
        const title = $(this).data('title');
        const url = $(this).data('url');
        const description = $(this).data('description');
        const thumbnail = $(this).data('thumbnail');
        const lastEdited= $(this).data('last-edited');
        const status = $(this).data('status');
        marker.setLatLng([lat, lng]).addTo(map);
        map.setView([lat, lng]);
        $('#map-info-title').text(title);
        $('#map-info-url').attr('href', url);
        $('#map-info-description').text(description);
        $('#map-info-thumbnail').attr('src', thumbnail);
        $('#map-info-last-edited').text(lastEdited);
        $('#map-info-status').text(status);
        $('#map-info').removeClass('hidden');
    });
});
