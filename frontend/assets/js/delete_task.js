let id_task= null;

window.onload = () => {

    const url = new URL(window.location.href)
    id_task=url.searchParams.get('id_task')
 
    fetch(`http://localhost:3000/user/tasks/get_task/${id_task}`)
    .then(res=>{
        if(res.status===200){
            return res.json();
        } else {
            console.log("Error");
        }
    }).then(task =>{

        let sts= {
            'new':'New',
            'in progress':'In progress',
            'canceled':'Canceled',
            'done':'Done'
        }

        document.querySelector("#task_txt").textContent = task[0].task_text
        document.querySelector("#task_status").textContent = sts[task[0].task_status]
    })

}

document.querySelector("#btn_delete").addEventListener('click', () => {
    fetch(`http://localhost:3000/user/tasks/delete_task/${id_task}`)
    .then(res => {
        if (res.status === 200) {
            window.location.href = window.location.origin + '/frontend/index.html';
        } else {
            throw new Error("Error!");
        }
    })
    .catch(() => {
        console.log("ERROR!");
    });
});
