let id_task= null;

window.onload = () => {

    const url = new URL(window.location.href)
    id_task=url.searchParams.get('id_task')
 
    fetch(`http://localhost:3000/user/tasks/get_task/${id_task}`)
    .then(res=>{
        if(res.status===200){
            return res.json();
        } else {
            console.log("no");
        }
    }).then(task =>{
        document.querySelector("#txt_task_text").value = task[0].task_text
    })

}

document.querySelector("#btn_update").addEventListener('click', () => {
    let txt = document.querySelector("#txt_task_text").value;
    let err = document.querySelector("#err")

    if(txt==null || txt == ""){
        err.textContent="Preencha o campo de texto!";
        err.classList.remove("d-none");
        return;
    }
    if(txt.length>100){
        err.textContent="Excedeu o número de characteres!";
        err.classList.remove("d-none");
        return;
    }

    fetch(`http://localhost:3000/user/tasks/update_task`, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_task, task_text:txt })
    })
    .then(res => {
        if (res.status === 200) {
            return res.json();
        } 
    }).then(() => {
        window.location.href = window.location.origin + '/frontend/index.html';
    })
    .catch(err => console.log("Erro ao atualizar tarefa: ", err));
    }
)