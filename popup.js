function Run(){

    let taskContainer = document.querySelector('.task_container')

    let todoList = [];


    // проверяем есть ли такси в локальном хранилище и выводим на страницу
    if(localStorage.getItem('todo')){
        todoList = JSON.parse(localStorage.getItem('todo'));
        showTodos();``
    }


    // слушаем, собираем таски и сохраняем в хранилище
    let getInput = document.getElementById('new_task_input');

    getInput.addEventListener('keypress', function(event){
        if (event.key === 'Enter'){
            let newTodo = {
                todo: getInput.value,
                done: false,
            }
            todoList.push(newTodo);
            showTodos()
            getInput.value = ''

            // сохраняем таски в локальном хранилище
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })


    // выводим таски на экран
    function showTodos(){
        let showTodo = '';
        todoList.forEach(function(item, index){
            showTodo += `
            <li class="li_item_${index}">
                <div class="sub_container_item_${index}" id="${item.done ? 'strikethrough' : ''}">
                    <input id="item_${index}" class="checkbox" type="checkbox" ${item.done ? 'checked' : ''}>
                    <label for="item_${index}">${item.todo}</label>
                </div>
            
                <button class="rm" id="item_${index}">&times;</button>
            </li>
            `;
            taskContainer.innerHTML = showTodo;
        })
    }


    // зачеркиваем таски и записываем в хранилище
    taskContainer.addEventListener('change', function(event){
        let getIdInput = event.target.getAttribute('id');
        let getLabel = taskContainer.querySelector('[for='+ getIdInput +']');
        let valueLabel = getLabel.innerHTML;
        
        let getElementContainer = taskContainer.querySelector('[class='+ 'sub_container_'+ getIdInput +']');

        todoList.forEach(function(item, index){
            if (item.todo === valueLabel){
                item.done = !item.done;
                if(item.done == true){
                    getElementContainer.style.textDecoration = "line-through"
                    getElementContainer.style.color = "#999999"

                    // удаляем задачу через n время
                    // setTimeout(function() {
                        
                    //     `todoList`.splice(index, 1);
                    //     showTodos();
                    //     localStorage.setItem('todo', JSON.stringify(todoList));
                    // }, 7000);

                }else{
                    getElementContainer.style.textDecoration = "none"
                    getElementContainer.style.color = "black"
                }
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        })
    })


    // удаляем таски и записываем в хранилище
    taskContainer.addEventListener('click', function(event){
        if (event.target.getAttribute('class') == 'rm'){
            let getIdButton = event.target.getAttribute('id');
            let getLabel = taskContainer.querySelector('[for='+ getIdButton +']');
            let valueLabel = getLabel.innerHTML;

            let getContForRm = taskContainer.querySelector('[class='+ 'li_'+ getIdButton +']');

            todoList.forEach(function(item, index){
                if(item.todo === valueLabel){
                    getContForRm.remove()
                    todoList.splice(index, 1);
                    // showTodos();
                    localStorage.setItem('todo', JSON.stringify(todoList));
                }
            })
        }
    })
}


Run()
