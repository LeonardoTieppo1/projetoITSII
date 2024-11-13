document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

  
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password:password })
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {
                throw new Error(err.message || 'Erro desconhecido');
            });
        }
        return res.json();
    })
    .then(data => {
        
        localStorage.setItem('token', data.token);
        
        window.location.href = 'index.html';
    })
    .catch(err => {
        alert(err.message); 
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
