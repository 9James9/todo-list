let lists = [{
    id: 1,
    name: 'name'
}, {
    id: 2,
    name:'name'
}]
const listContainer = document.querySelector('#listContainer')
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
function renderList(){
    clearElement(listContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        listContainer.appendChild(listElement)
    })
    
}
function clearElement(element){
    //removes the old values so there aren't duplicate lists added
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
export { newListInput,renderList,lists }