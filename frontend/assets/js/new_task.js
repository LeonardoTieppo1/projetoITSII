let id_user = null;

window.onload = () => {
    const url = new URL(window.location.href);
    id_user = url.searchParams.get('id_user');

    if (!id_user) {
        console.error("Erro: id_user não encontrado na URL");
        alert("Erro: Não foi possível obter o ID do usuário.");
        return;
    }

    const taskInput = document.querySelector("#txt_task_text");
    const charCount = document.querySelector("#char-count");
    const maxLength = taskInput.getAttribute('maxlength');

    taskInput.addEventListener('input', function() {
        const currentLength = taskInput.value.length;
        charCount.textContent = `${currentLength}/${maxLength} caracteres`;
    });

    document.querySelector("#btn_guardar").addEventListener('click', () => {
        let task_text = taskInput.value;
        let err = document.querySelector("#err");

        err.classList.add("d-none");

        if (task_text == null || task_text === "") {
            err.textContent = "Preencha o campo de texto!";
            err.classList.remove("d-none");
            return;
        }

        if (task_text.length > 100) {
            err.textContent = "Excedeu o número de caracteres!";
            err.classList.remove("d-none");
            return;
        }

        fetch(`http://localhost:3000/user/tasks/new_task`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_user: id_user, task_text: task_text })
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error("Erro ao salvar a tarefa");
            }
        })
        .then(data => {
            console.log("Tarefa criada com sucesso:", data);
            window.location.href = window.location.origin + '/frontend/index.html';
        })
        .catch(error => {
            err.textContent = "Erro ao salvar a tarefa. Tente novamente!";
            err.classList.remove("d-none");
            console.error("Erro:", error);
        });
    });
};
