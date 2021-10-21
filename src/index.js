const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const LOCAL_STORAGE_LIST_KEY = `task.lists`
const deleteListButton = document.querySelector('[data-delete-list-button]')
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
const listContainer = document.querySelector('#listContainer')
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = `task.selectedListId`
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')  
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')
clearCompleteTasksButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})
listContainer.addEventListener('click',e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})
deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
})
/*
//get values from the input forms
function getValues() {
    return {
        title: document.querySelector('#todotitle').value,
        description: document.querySelector('#tododescription').value,
        priority: document.getElementById('priorityradio').elements["priority"].value
    }
}
*/
function render(){
    clearElement(listContainer)
    renderList()

    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId == null){
        //find out why this is making everything disappear
        //listDisplayContainer.style.display = 'none'
    } else {
        listDisplayContainer.style.display = ''
        listTitleElement.innerText = selectedList.name
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}
function renderTasks(selectedList){
    selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)
    const checkBox = taskElement.querySelector('input')
    checkBox.id = task.id
    checkBox.checked = task.complete
    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    tasksContainer.appendChild(taskElement)
    /*
    const taskDescription = taskElement.querySelector('.taskdescription')
    const taskPriority = taskElement.querySelector('taskpriority')
    */
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
     
        if (taskName == null || taskName === "") return
        const task = createTask(taskName)
       
        newTaskInput.value = null
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
function createTask(name){
    return {id: Date.now().toString(), name: name ,complete: false}
}
function createList(name){
    //make object with unique id by taking the date and converting it to a string, and assign it the list name that was input
    return { id: Date.now().toString(), name: name, tasks: [] }

}


/*
function newListInput(){
    //creates form to collect the new list name, and a submit button
   let chooseName = document.createElement('input')
  let submitName = document.createElement('button')
  submitName.textContent = "Submit"
  document.getElementById('todobtns').appendChild(chooseName)
  document.getElementById('todobtns').appendChild(submitName)

  submitName.addEventListener('click', () => {
      lists.push(chooseName.value)
      renderList()
  })
}
*/

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}
function saveAndRender(){
    save()
    render()
}
function clearElement(element) {
    //removes the old values so there aren't duplicate lists added
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
/*
document.querySelector('#submit').addEventListener('click', addTodo)
//document.querySelector('#addlist').addEventListener('click',newListInput)
//create a div with the values from the input forms
function addTodo() {
    let data = getValues()
    let mainContainer = document.querySelector('#todocontainer')
    let newcontainer = document.createElement('div')
    newcontainer.classList.add('todobox')
    mainContainer.appendChild(newcontainer)

    let todotitle = document.createElement('h2')
    newcontainer.appendChild(todotitle)
    todotitle.textContent = data.title

    let tododescription = document.createElement('p')
    newcontainer.appendChild(tododescription)
    tododescription.textContent = data.description

    let todopriority = document.createElement('p')
    newcontainer.appendChild(todopriority)
    todopriority.textContent = `Priority: ${data.priority}`

    let removeBtn = document.createElement('button')
    newcontainer.appendChild(removeBtn)
    removeBtn.textContent = "Remove"
    removeBtn.addEventListener('click', removeTodo)

    clearValues()
}
*/
/*
function clearValues() {
    document.querySelector('#todotitle').value = ""
    document.querySelector('#tododescription').value = ""
    document.getElementById('low').checked = false
    document.getElementById('medium').checked = false
    document.getElementById('high').checked = false
}
*/
renderList()
saveAndRender()