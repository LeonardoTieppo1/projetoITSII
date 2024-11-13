document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return; 
    }

    fetch(`http://localhost:3000/check-username?username=${username}`)
        .then(res => res.json())
        .then(data => {
            if (data.exists) {
                alert('Nome de usuário já está em uso. Escolha um nome diferente.');
                return; 
            } else {
                
                fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
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
                    alert(data.message); 
                    window.location.href = 'login.html';
                })
                .catch(err => {
                    alert(err.message); 
                });
            }
        })
        .catch(err => {
            alert('Erro ao verificar nome de usuário: ' + err.message);
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