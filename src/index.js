const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
//get values from the input forms
function getValues() {
    return {
        title: document.querySelector('#todotitle').value,
        description: document.querySelector('#tododescription').value,
        priority: document.getElementById('priorityradio').elements["priority"].value
    }
}
//prevents the page from refreshing when the form is submitted
function stopRefresh(){
    newListForm.addEventListener('submit', e => {
        e.preventDefault()
    })
}
stopRefresh()
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

function clearValues() {
    document.querySelector('#todotitle').value = ""
    document.querySelector('#tododescription').value = ""
    document.getElementById('low').checked = false
    document.getElementById('medium').checked = false
    document.getElementById('high').checked = false
}

function removeTodo() {

}
let lists = [{
    id: 1,
    name: 'name1',
}, {
    id: 2,
    name: 'name2',
}]
const listContainer = document.querySelector('#listContainer')
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

function renderList() {
    clearElement(listContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        listContainer.appendChild(listElement)
    })

}

function clearElement(element) {
    //removes the old values so there aren't duplicate lists added
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

document.querySelector('#submit').addEventListener('click', addTodo)
//document.querySelector('#addlist').addEventListener('click',newListInput)