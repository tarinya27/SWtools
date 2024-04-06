console.log('statusbar.js loaded');

function updateClock() {
    // Get the current date and time
    const now = new Date();

    // Format the time as HH:MM:SS
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Display the time on the clock element
    $("#clock")[0].textContent = hours + ':' + minutes + ':' + seconds;
    console.log('updateClock() called');
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial update to prevent delay in displaying the clock
updateClock();