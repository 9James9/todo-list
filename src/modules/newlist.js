function newList(){
   let chooseName = document.createElement('input')
  let submitName = document.createElement('button')
  submitName.textContent = "Submit"
  document.getElementById('todobtns').appendChild(chooseName)
  document.getElementById('todobtns').appendChild(submitName)
}
export { newList }