function process(id, status) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', value);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    fetch('process.php', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            location.reload();
        })
        .catch(error => {
            $('#yourDivId').append(`
                    <div class='error'>
                        ${error}
                        <button class='close-btn'><i class='fa-solid fa-xmark'></i></button>
                    </div>
                `);
        });
}