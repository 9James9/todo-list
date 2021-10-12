//get values from the input forms
function getValues(){
    return {
        title : document.querySelector('#todotitle').value,
        description : document.querySelector('#tododescription').value,
        priority : document.getElementById('priorityradio').elements["priority"].value
    }
}
//create a div with the values from the input forms
function addTodo(){
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
function clearValues(){
    document.querySelector('#todotitle').value = ""
    document.querySelector('#tododescription').value = ""
    document.getElementById('low').checked = false
    document.getElementById('medium').checked = false
    document.getElementById('high').checked = false
}
function removeTodo(){
    
}
export { addTodo }

