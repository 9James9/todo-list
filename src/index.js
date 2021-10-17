import { addTodo } from "./modules/addtodo"
import { newListInput,renderList } from "./modules/newlist.js"
renderList()
document.querySelector('#submit').addEventListener('click',addTodo)
document.querySelector('#addlist').addEventListener('click',newListInput)