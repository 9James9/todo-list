const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const LOCAL_STORAGE_LIST_KEY = `task.lists`
const deleteListButton = document.querySelector('[data-delete-list-button]')
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
const listContainer = document.querySelector('#listContainer')
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = `task.selectedListId`
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
//const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const newDescriptionInput = document.querySelector('[data-new-task-input-description]')
//const newTaskPriority = document.querySelector('[data-new-task-priority]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')
const todoContainer = document.querySelector('#todocontainer')
clearCompleteTasksButton.addEventListener('click', () => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})
listContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})
deleteListButton.addEventListener('click', () => {
    if (prompt('Are you sure? Type "yes" to delete this list') == 'yes') {
        lists = lists.filter(list => list.id !== selectedListId)
        selectedListId = null
        saveAndRender()
    } else return
    
})

function render() {
    clearElement(listContainer)
    renderList()
    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId == null) {
        todoContainer.style.display = 'none'
    } else {
        todoContainer.style.display = ''
        listTitleElement.innerText = selectedList.name
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
    addClasses()
}

function renderTasks(selectedList) {

    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkBox = taskElement.querySelector('input')
        checkBox.classList.add('checkbox')
        checkBox.id = task.id
        checkBox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        const taskTitle = document.createElement('h3')
        const taskDescription = document.createElement('p')
        taskDescription.textContent = task.description
        taskTitle.textContent = task.name
        label.appendChild(taskTitle)
        label.appendChild(taskDescription)
        tasksContainer.appendChild(taskElement)

    })

}

function renderList() {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        if (list.id === selectedListId) {
            listElement.classList.add('active-list')
        }
        listContainer.appendChild(listElement)
    })

}

newListForm.addEventListener('submit', e => {
    //prevents the page from refreshing when the form is submitted
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName == "") return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    let taskDescripton = newDescriptionInput.value
    const taskPriority = document.querySelector('input[name="priority"]:checked').value;
    //console.log(taskPriority)
    if (taskName == null || taskName === "") return
    if (taskDescripton == null || taskDescripton === "") {
        taskDescripton = ""
    }
    const task = createTask(taskName, taskDescripton, taskPriority)
    newTaskInput.value = null
    newDescriptionInput.value = null
    taskPriority.value = null
    document.getElementById('lowpriority').checked = false
    document.getElementById('mediumpriority').checked = false
    document.getElementById('highpriority').checked = false
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(task)
    saveAndRender()
})
tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId)
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        saveAndRender()
    }
})

function createTask(name, description, priority) {
    return {
        id: Date.now().toString(),
        name: name,
        description: description,
        priority: priority,
        complete: false
    }
}

function createList(name) {
    //make object with unique id by taking the date and converting it to a string, and assign it the list name that was input
    return {
        id: Date.now().toString(),
        name: name,
        tasks: []
    }

}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function saveAndRender() {

    save()
    render()
}

function clearElement(element) {
    //removes the old values so there aren't duplicate lists added
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function addClasses() {

    const selectedList = lists.find(list => list.id === selectedListId)
    //loop through selected list and assign classes for priorities to change the color
    const tasks = document.querySelectorAll('div.task')
    for (let i = 0; i < tasks.length; i++) {
        if (selectedList.tasks[i].priority == 'Low') {
            tasks[i].classList.add('low-priority-task')
        } else if (selectedList.tasks[i].priority == 'Medium') {
            tasks[i].classList.add('medium-priority-task')
        } else if (selectedList.tasks[i].priority == 'High') {
            tasks[i].classList.add('high-priority-task')
        }
    }
}
renderList()
saveAndRender()
addClasses()