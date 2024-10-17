document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Capture form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Prepare the data for submission
    const formData = { name, email, phone, message };

    // Send form data to the server using Fetch API
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            // Show success message
            document.getElementById('successMessage').classList.remove('d-none');
        }
    })
    .catch(error => console.error('Error:', error));
});
