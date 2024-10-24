document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return; // Impede o envio do formulário se as senhas não coincidem
    }

    // Envia a solicitação de registro
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
        alert(data.message); // Exibe a mensagem de sucesso
        // Redireciona para a página de login após o registro
        window.location.href = 'login.html';
    })
    .catch(err => {
        alert(err.message); // Exibe o erro em um alerta
    });
});
