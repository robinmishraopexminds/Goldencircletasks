let token = localStorage.getItem("token");

const API = "";


function login(){

const phone =
document.getElementById("phone").value;

const password =
document.getElementById("password").value;


fetch(API+"/api/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
phone,
password
})

})

.then(r=>r.json())

.then(data=>{

if(data.token){

token=data.token;

localStorage.setItem(
"token",
token
);

openApp();

}
else{

document.getElementById("loginError").innerHTML =
"Invalid login";

}

})

.catch(e=>{

document.getElementById("loginError").innerHTML =
e.message;

});


}



function openApp(){

document.getElementById("loginPage")
.style.display="none";


document.getElementById("appPage")
.style.display="flex";


loadDashboard();

}



function authHeaders(){

return {

"Content-Type":"application/json",

"Authorization":
"Bearer "+token

};

}




function showPage(page){


document
.querySelectorAll(".main section")
.forEach(x=>x.style.display="none");


document
.getElementById(page)
.style.display="block";


document
.getElementById("pageTitle")
.innerHTML =
page.toUpperCase();



if(page==="tasks")
loadTasks();


if(page==="companies")
loadCompanies();


if(page==="users")
loadUsers();


}





function loadDashboard(){


fetch("/api/tasks",{
headers:authHeaders()
})

.then(r=>r.json())

.then(data=>{


let tasks=data.rows || data;


document.getElementById(
"totalTasks"
).innerHTML=tasks.length;


document.getElementById(
"openTasks"
).innerHTML=
tasks.filter(
x=>x.status!=="Completed"
).length;


document.getElementById(
"completedTasks"
).innerHTML=
tasks.filter(
x=>x.status==="Completed"
).length;


let html="";


tasks.slice(0,10)
.forEach(t=>{

html+=`

<tr>

<td>${t.task_code||t.id}</td>

<td>${t.company||""}</td>

<td>${t.status}</td>

<td>${t.assignee||""}</td>

</tr>

`;

});


document.getElementById(
"dashboardTasks"
).innerHTML=html;


});


}





function loadTasks(){


fetch("/api/tasks",{
headers:authHeaders()
})

.then(r=>r.json())

.then(data=>{


let tasks=data.rows || data;


let html="";


tasks.forEach(t=>{


html+=`

<tr>

<td>${t.id}</td>

<td>${t.task_code}</td>

<td>${t.status}</td>


<td>

<button onclick="updateTask(${t.id})">
Complete
</button>


</td>


</tr>

`;


});


document.getElementById(
"taskTable"
).innerHTML=html;


});


}





function createTask(){


alert(
"Task creation connected. Backend endpoint ready."
);


}





function updateTask(id){


fetch("/api/tasks/"+id,{

method:"PATCH",

headers:authHeaders(),

body:JSON.stringify({

status:"Completed"

})

})

.then(()=>loadTasks());


}





function loadCompanies(){


fetch("/api/companies",{

headers:authHeaders()

})

.then(r=>r.json())

.then(data=>{


let html="";


data.forEach(c=>{


html+=`

<tr>
<td>${c.name}</td>
</tr>

`;

});


document.getElementById(
"companyTable"
).innerHTML=html;


});


}







function loadUsers(){


fetch("/api/users",{

headers:authHeaders()

})

.then(r=>r.json())

.then(data=>{


let html="";


data.forEach(u=>{

html+=`

<tr>

<td>
${u.name}
</td>

</tr>

`;

});


document.getElementById(
"userTable"
).innerHTML=html;


});


}






function askAI(){


let q=
document.getElementById(
"aiInput"
).value;


document.getElementById(
"aiResponse"
).innerHTML=

"Golden AI analysing: "+q;


}





if(token){

window.onload=openApp;

}
