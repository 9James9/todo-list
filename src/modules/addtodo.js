//get values from the input forms
function getValues(){
    return {
        title : document.querySelector('#todotitle').value,
        description : document.querySelector('#tododescription').value
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
}
export { addTodo }

