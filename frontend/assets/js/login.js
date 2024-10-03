document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Envia a solicitação de login
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password:password }) // Certifique-se de que estes campos estejam corretos
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
        // Armazena o token no localStorage
        localStorage.setItem('token', data.token);
        // Redireciona para a página index.html
        window.location.href = 'index.html';
    })
    .catch(err => {
        alert(err.message); // Exibe o erro em um alerta
    });
});
