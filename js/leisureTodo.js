const minorTodoObject = {
    minorTodoArray: [],
    minorCompletedArray: [],
    toggleComplete(task) {
        task.completed = !task.completed
        this.setComplete(task)
        this.setTodo(task)
        this.renderTodoTasks()
        this.renderCompleteTasks()
    },
    setComplete(task) {
        const todoVal = this.minorCompletedArray.findIndex((todo) => {
            if (task.title.includes(todo.title) && task.description.includes(todo.description)) {
                return todo
            } 
        })
        for (let task of minorTodoObject.minorCompletedArray) {
            if (!task.completed) {
                minorTodoObject.minorTodoArray.push(task)
                minorTodoObject.minorCompletedArray.splice(todoVal, 1)
            }
        }
    },
    setTodo(task) {
        const todoVal = this.minorTodoArray.findIndex((todo) => {
            if (task.title.includes(todo.title) && task.description.includes(todo.description)) {
                return todo
            } 
        })
        for (let task of minorTodoObject.minorTodoArray) {
            if (task.completed) {
                minorTodoObject.minorCompletedArray.push(task)
                minorTodoObject.minorTodoArray.splice(todoVal, 1)
            }
        }
    },
    renderTodoTasks() {
        minorTodo.innerHTML = ''
        for (let task of minorTodoObject.minorTodoArray) {
            const {title, description, dueDate, dueTime} = task
            const newListItem = document.createElement('li')
            newListItem.setAttribute('class', 'todoItem')
            newListItem.innerHTML = `
                <h3 style="text-transform: uppercase" class="todoTitle">${title}</h3>
                <p>${description}</p>
                <p>Due: <span>${dueDate}</span> at <span>${dueTime}</span></p>
                <i class="fa fa-circle-thin"></i>
            `
            minorTodo.appendChild(newListItem)
            newListItem.addEventListener('click', () => {
                this.toggleComplete(task)
            })
        }
        localStorage.setItem('openMinorTasks', JSON.stringify(this.minorTodoArray))
    },
    renderCompleteTasks() {
        minorComplete.innerHTML = ''
        for (let task of minorTodoObject.minorCompletedArray) {
            const {title, description, dueDate, dueTime} = task;
            const newListItem = document.createElement('li');
            newListItem.setAttribute('class', 'todoItem')
            newListItem.innerHTML = `
                <h3 style="text-transform: uppercase" class="todoTitle">${title}</h3>
                <p>${description}</p>
                <p>Due: <span>${dueDate}</span> at <span>${dueTime}</span></p>
                <i class="fa fa-check-circle-o"></i>
            `
            minorComplete.appendChild(newListItem)
            newListItem.addEventListener('click', () => {
                this.toggleComplete(task)
            })
        }
    },
    sortAZ() {
        this.minorTodoArray.sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
        console.log(this.minorTodoArray)
        this.renderTodoTasks()
    },
    sortDate() {
        this.minorTodoArray.sort((a, b) => {
            a = a.dueDate.split('/').reverse().join('');
            b = b.dueDate.split('/').reverse().join('');
            return a > b ? 1 : a < b ? -1 : 0;
        })
        this.renderTodoTasks()
    }
}