$(document).ready(function () {
    // Display hints based on user input
    $('#username').on('input', function () {
        const username = $(this).val();
        if (username.length > 30) {
            $('#usernameHint').show();
        } else {
            $('#usernameHint').hide();
        }
    });

    $('#name').on('input', function () {
        const name = $(this).val();
        if (name.length > 255) {
            $('#nameHint').show();
        } else {
            $('#nameHint').hide();
        }
    });

    $('#password').on('input', function () {
        const password = $(this).val();
        // Regular expression to match password criteria:
        // - Between 8 and 32 characters
        // - At least one letter
        // - At least one number
        // - At least one symbol (non-alphanumeric character)
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$/;
        if (!regex.test(password)) {
            $('#passwordHint').show();
        } else {
            $('#passwordHint').hide();
        }
    });

    const imageInput = document.getElementById('avatarInput');
    const previewImage = document.getElementById('avatarPreview');
    function previewSelectedImage() {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                previewImage.src = e.target.result;
            }
        }
    }
    imageInput.addEventListener('change', previewSelectedImage);
});