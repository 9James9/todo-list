const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const LOCAL_STORAGE_LIST_KEY = `task.lists`
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
const listContainer = document.querySelector('#listContainer')
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = `task.selectedListId`
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
listContainer.addEventListener('click',e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})
//get values from the input forms
function getValues() {
    return {
        title: document.querySelector('#todotitle').value,
        description: document.querySelector('#tododescription').value,
        priority: document.getElementById('priorityradio').elements["priority"].value
    }
}
function renderList() {
    clearElement(listContainer)
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
//prevents the page from refreshing when the form is submitted
    newListForm.addEventListener('submit', e => {
        e.preventDefault()
        const listName = newListInput.value
        if (listName == null || listName == "") return
        const list = createList(listName)
        newListInput.value = null
        lists.push(list)
        saveAndRender()
    })


function addNewList(){
        
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
}
function saveAndRender(){
    save()
    renderList()
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