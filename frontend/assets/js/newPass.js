document.getElementById("update-password-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`http://localhost:3000/user/update_password`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) 
    })
    .then(res => res.json()) 
    .then(data => {
        if (data.message) {
            alert(data.message); 
        }
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});

document.querySelectorAll('.input-group').forEach(group => {
    const passwordInput = group.querySelector('input[type="password"]');
    if (passwordInput) {
        const revealIcon = document.createElement('img');
        
        revealIcon.src = '/frontend/assets/img/password-reveal.png';
        revealIcon.alt = 'Mostrar senha';
        revealIcon.classList.add('password-reveal');
        revealIcon.style.cursor = 'pointer';

        group.appendChild(revealIcon);

        revealIcon.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                revealIcon.alt = 'Esconder senha';
            } else {
                passwordInput.type = 'password';
                revealIcon.alt = 'Mostrar senha';
            }
        });
    }
});