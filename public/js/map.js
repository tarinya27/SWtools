$(document).ready(() => {
    const map = L.map('map').setView([6.821382357635158, 80.04157289503557], 20);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const mapItems = $('.map-item');
    mapItems.each(function () {
        const mapItem = $(this);
        const lat = mapItem.data('lat');
        const lng = mapItem.data('lng');
        const title = mapItem.data('title');
        const desc = mapItem.data('desc');
        const thumbUri = mapItem.data('thumb-uri');
        const url = mapItem.data('url');
        const marker = L.marker([lat, lng]).addTo(map).bindPopup(`<div class="map-popup"><img class="thumbnail" src="${thumbUri}" alt="${title}"><a class="title" href="${url}">${title}</a><p class="description">${desc}</p></div>`);

        function onClick() {
            mapItems.removeClass('active');
            mapItem.addClass('active');
            map.flyTo([lat, lng]);
        }

        marker.on("click", onClick);
        mapItem.click(onClick);
    });
});
