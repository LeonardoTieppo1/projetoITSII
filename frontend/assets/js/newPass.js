document.getElementById("update-password-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Realizar o fetch para enviar o pedido de atualização de senha
    fetch(`http://localhost:3000/user/update_password`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) // Enviando username e a nova senha
    })
    .then(res => res.json()) // Parse a resposta como JSON
    .then(data => {
        if (data.message) {
            alert(data.message); // Exibe a mensagem retornada do servidor
        }
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});
