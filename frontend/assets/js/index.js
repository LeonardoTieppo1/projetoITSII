let colors = [
    { task_status: 'new', select_bg_color: 'bg-white' },
    { task_status: 'in progress', select_bg_color: 'bg-info' },
    { task_status: 'canceled', select_bg_color: 'bg-danger' },
    { task_status: 'done', select_bg_color: 'bg-success' }
];

let id_user = null; // Declare id_user como global

window.onload = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'login.html';
    } else {
        id_user = get_user_id_from_token(token); // Atribua o id_user aqui
        get_user_username(id_user);
        get_user_tasks(id_user);
        
        // Adicione os event listeners aqui, onde id_user já está definido
        document.querySelector("#btn_new_task").addEventListener("click", () => {
            const url = window.location.origin + "/frontend/new_task.html?id_user=" + id_user;
            window.location.href = url;
        });

        document.querySelector("#select_filter").addEventListener('click', () => {
            let sts = document.querySelector("#select_filter").value;
            get_user_tasks(id_user, sts);
        });
    }
}

document.getElementById('logout-btn').addEventListener('click', function() {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    
    // Redireciona o usuário para a página de login
    window.location.href = 'login.html';
});

// Função para extrair o id_user do token JWT
function get_user_id_from_token(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id_user;
}

function get_user_username(id_user) {
    fetch(`http://localhost:3000/user/${id_user}`)
        .then(res => {
            console.log("Resposta da API:", res); // Verifica a resposta
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Erro ao buscar o usuário");
            }
        })
        .then(data => {
            console.log("Dados recebidos:", data); // Verifica os dados
            if (!data || data.length === 0) {
                console.log("Nenhum usuário encontrado");
            } else {
                // Verifica se o elemento existe no DOM
                const usernameElement = document.querySelector("#username");
                console.log("Elemento username encontrado?", usernameElement !== null);

                // Corrige o acesso ao primeiro item do array
                const user = data[0]; // Acessa o primeiro objeto no array

                if (usernameElement && user) {
                    usernameElement.textContent = user.username; // Atualiza o texto com o username correto
                    console.log("Username atualizado para:", user.username);
                }
            }
        })
        .catch(err => {
            console.error("Erro na requisição:", err);
        });
}

function get_user_tasks(id_user, sts = "all") {
    fetch(`http://localhost:3000/user/${id_user}/tasks/${sts}`)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Erro ao buscar tarefas");
            }
        })
        .then(tasks => {
            // Limpa o contêiner de tarefas
            const taskContainer = document.querySelector("#task_container");
            taskContainer.innerHTML = ''; // Limpa as tarefas existentes

            // Verifica se há tarefas
            if (tasks.length === 0) {
                document.querySelector('#no_task').classList.remove("d-none");
                document.querySelector("#total_task").classList.add("d-none");
            } else {
                // Remove a mensagem de "nenhuma tarefa"
                document.querySelector('#no_task').classList.add('d-none');
                document.querySelector("#total_task").classList.remove("d-none");
                document.querySelector("#total_task > div > h4 > span").textContent = tasks.length;

                tasks.forEach(task => {
                    let color = colors.find(item => item.task_status === task.task_status);
                    let html = `
                        <div class="col-12 border border-primary rounded p-3 shadow">
                            <div class="row align-items-center">
                                <div class="col-7">
                                    <div class="d-flex align-items-center">
                                        <h5 class="me-3 text-info"><i class="fa-regular fa-circle-right"></i></h5>
                                        <h5>${task.task_text}</h5>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <select id="task_status_${task.id}" onChange="change_task_status(${task.id})" class="form-select p-2 ${color.select_bg_color}">
                                        <option value="new" ${task.task_status === 'new' ? 'selected' : ""}>New</option>
                                        <option value="in progress" ${task.task_status === 'in progress' ? 'selected' : ""}>In progress</option>
                                        <option value="canceled" ${task.task_status === 'canceled' ? 'selected' : ""}>Canceled</option>
                                        <option value="done" ${task.task_status === 'done' ? 'selected' : ""}>Done</option>
                                    </select>
                                </div>
                                <div class="col-1 text-end">
                                    <span class='edit_link' onclick="edit_task(${task.id})">
                                        <i class="fa-solid fa-pen-to-square me-2"></i>
                                        edit
                                    </span>
                                </div>
                                <div class="col-2 text-end">
                                    <span class='delete_link' onclick="delete_task(${task.id})">
                                        <i class="fa-solid fa-trash-can me-2"></i>
                                        delete
                                    </span>
                                </div>
                            </div>
                        </div>`;

                    let task_new = document.createElement("div");
                    task_new.classList.add('row', 'mb-3');
                    task_new.innerHTML = html;
                    taskContainer.appendChild(task_new);
                });
            }
        });
}

function edit_task(task_id) {
    const url = window.location.origin + "/frontend/edit_task.html?id_task=" + task_id;
    window.location.href = url;
}

function delete_task(task_id) {
    const url = window.location.origin + "/frontend/delete_task.html?id_task=" + task_id;
    window.location.href = url;
}

function change_task_status(task_id) {
    let status = document.querySelector("#task_status_" + task_id).value;

    fetch(`http://localhost:3000/user/tasks/update_status`, {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id, status })
    })
    .then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            console.error("Erro ao alterar o status da tarefa:", res.status);
        }
    })
    .then(data => {});

    let color = colors.find(e => e.task_status == status);
    let select = document.querySelector(`#task_status_${task_id}`);
    let colors_map = colors.map(c => c.select_bg_color);

    select.classList.remove(...colors_map);
    select.classList.add(color.select_bg_color);
}
