const getOpenLeisureTasks = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const retrieveOpenLeisureTasks = localStorage.getItem('openMinorTasks')
            const openTasks = JSON.parse(retrieveOpenLeisureTasks)
            if (openTasks.length > 0) {
                return res(openTasks)
            }
            return rej()
        }, 50)
    })
}
getOpenLeisureTasks().then((tasks) => {
    for (let task of tasks) {
        minorTodoObject.minorTodoArray.push(task)
    }
    minorTodoObject.renderTodoTasks()
}).catch(() => {
    console.log('No tasks stored')
})

const getOpenWorkTasks = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const retrieveOpenWorkTasks = localStorage.getItem('openUrgentTasks')
            const openTasks = JSON.parse(retrieveOpenWorkTasks)
            if (openTasks.length > 0) {
                return res(openTasks)
            }
            return rej()
        }, 50)
    })
}
getOpenWorkTasks().then((tasks) => {
    for (let task of tasks) {
        urgentTodoObject.urgentTodoArray.push(task)
    }
    urgentTodoObject.renderTodoTasks()
}).catch(() => {
    console.log('No tasks stored')
})

class Todo {
    constructor(title, description, dueDate, dueTime, completed = false) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.dueTime = dueTime,
        this.completed = completed
    }
}

class Urgent extends Todo {
    constructor(title, description, dueDate, dueTime, priority = 'Urgent', completed = false) {
        super(title, description, dueDate, dueTime, completed)
        this.priority = priority
    }
}

class Minor extends Todo {
    constructor(title, description, dueDate, dueTime, priority = 'Minor', completed = false) {
        super(title, description, dueDate, dueTime, completed)
        this.priority = priority
    }
}


const addMinor = document.getElementById('addMinorForm')
const minorTitle = document.getElementById('minorTitle')
const minorDesc = document.getElementById('minorDesc')
const minorDate = document.getElementById('minorDate')
const minorTime = document.getElementById('minorTime')
const minorTodo = document.getElementById('minorTodo')
const minorComplete = document.getElementById('minorCompleted')
const minorSortAZ = document.getElementById('minorSortAZ')
const minorSortDate = document.getElementById('minorSortDate')

addMinor.addEventListener('submit', (e) => {
    if (!minorTitle.value || !minorDesc.value) {
        if (!minorTitle.value && minorDesc.value) {
            alert('Please provide a Title')
        } else {
            alert('Please provide more detail')
        }
        e.preventDefault()
        return
    }
    const newMinor = new Minor(minorTitle.value, minorDesc.value, minorDate.value, minorTime.value)
    minorTodoObject.minorTodoArray.push(newMinor)
    minorTodoObject.renderTodoTasks()
    resetInputs()
    e.preventDefault()
})

minorSortAZ.addEventListener('change', ({target}) => {
    if (target.checked) {
        minorTodoObject.sortAZ()
        minorSortDate.checked = false;
    }
})

minorSortDate.addEventListener('change', ({target}) => {
    if (target.checked) {
        minorTodoObject.sortDate()
        minorSortAZ.checked = false;
    }
})


const addUrgent = document.getElementById('addUrgentForm')
const urgentTitle = document.getElementById('urgentTitle')
const urgentDesc = document.getElementById('urgentDesc')
const urgentDate = document.getElementById('urgentDate')
const urgentTime = document.getElementById('urgentTime')
const urgentTodo = document.getElementById('urgentTodo')
const urgentComplete = document.getElementById('urgentCompleted')
const urgentSortAZ = document.getElementById('urgentSortAZ')
const urgentSortDate = document.getElementById('urgentSortDate')

addUrgent.addEventListener('submit', (e) => {
    if (!urgentTitle.value || !urgentDesc.value) {
        if (!urgentTitle.value && urgentDesc.value) {
            alert('Please provide a Title')
        } else {
            alert('Please provide more detail')
        }
        e.preventDefault()
        return
    }
    const newUrgent = new Urgent(urgentTitle.value, urgentDesc.value, urgentDate.value, urgentTime.value)
    urgentTodoObject.urgentTodoArray.push(newUrgent)
    urgentTodoObject.renderTodoTasks()
    resetInputs()
    e.preventDefault()
})

urgentSortAZ.addEventListener('change', ({target}) => {
    if (target.checked) {
        urgentTodoObject.sortAZ()
        urgentSortDate.checked = false
    }
})

urgentSortDate.addEventListener('change', ({target}) => {
    if (target.checked) {
        urgentTodoObject.sortDate()
        urgentSortAZ.checked = false;
    }
})


resetInputs = () => {
    minorTitle.value = ''
    minorDesc.value = ''
    minorDate.value = ''
    minorTime.value = ''
    urgentTitle.value = ''
    urgentDesc.value = ''
    urgentDate.value = ''
    urgentTitle.value = ''
}


const searchBox = document.getElementById('searchBox')

searchBox.addEventListener('keyup', (e) => {
    let todoBlocks = document.querySelectorAll('.todoTitle')
    todoBlocks = Array.from(todoBlocks)
    if (e.target.value !== '') {
        todoBlocks.filter((block) => {
            if (!block.innerHTML.toUpperCase().includes(e.target.value.toUpperCase())) {
                block.parentElement.classList.add('match')
            } else {
                block.parentElement.style.boxShadow = '0px 0px 20px 10px #33ff33'
            }
        })
    } else {
        todoBlocks.forEach((block) => {
            block.parentElement.classList.remove('match')
            block.parentElement.style.boxShadow = 'none'
        })
    }
})