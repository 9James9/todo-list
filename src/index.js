import { addTodo } from "./modules/addtodo"
import { newList } from "./modules/newlist.js"
document.querySelector('#submit').addEventListener('click',addTodo)
document.querySelector('#addlist').addEventListener('click',newList)