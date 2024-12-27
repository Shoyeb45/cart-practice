const form = document.getElementById('register-form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        fullname: formData.get('fullname'),
    };
    
    try {
        const response = await fetch("http://localhost:8000/api/v1/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);  // Successfully registered
        }
        else {
            alert(result.message);
        }

    } catch (error) {
        console.log("Error:", error);
    }
});
