(()=>{const e=document.querySelector("[data-new-list-form]");function t(){}document.querySelector("[data-new-list-input]"),e.addEventListener("submit",(e=>{e.preventDefault()})),document.querySelector("#listContainer"),document.querySelector("#submit").addEventListener("click",(function(){let e={title:document.querySelector("#todotitle").value,description:document.querySelector("#tododescription").value,priority:document.getElementById("priorityradio").elements.priority.value},n=document.querySelector("#todocontainer"),o=document.createElement("div");o.classList.add("todobox"),n.appendChild(o);let d=document.createElement("h2");o.appendChild(d),d.textContent=e.title;let c=document.createElement("p");o.appendChild(c),c.textContent=e.description;let i=document.createElement("p");o.appendChild(i),i.textContent=`Priority: ${e.priority}`;let l=document.createElement("button");o.appendChild(l),l.textContent="Remove",l.addEventListener("click",t),document.querySelector("#todotitle").value="",document.querySelector("#tododescription").value="",document.getElementById("low").checked=!1,document.getElementById("medium").checked=!1,document.getElementById("high").checked=!1}))})();