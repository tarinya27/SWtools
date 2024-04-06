$(document).ready(() => {
    const map = L.map('map-input').setView([6.821382357635158, 80.04157289503557], 20);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize marker
    const marker = L.marker([6.821382357635158, 80.04157289503557]).addTo(map);

    // Event listener for map click
    map.on('click', (e) => {
        updatePosition(e.latlng)
    });

    $('#update-map').click(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => updatePosition([position.coords.latitude, position.coords.longitude]),
                showError
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    });

    function updatePosition(latlng) {
        map.setView(latlng);
        marker.setLatLng(latlng);
        $('#latitude')[0].value = (latlng[0] ?? latlng.lat).toFixed(6);
        $('#longitude')[0].value = (latlng[1] ?? latlng.lng).toFixed(6);
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            default:
                console.log("An unknown error occurred.");
                break;
        }
    }
});
