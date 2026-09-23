let token = localStorage.getItem("token");

function login(){
 const phone=document.getElementById('phone').value;
 const password=document.getElementById('password').value;
 fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,password})})
 .then(r=>r.json()).then(d=>{if(d.token){token=d.token;localStorage.setItem('token',token);openApp()}else document.getElementById('loginError').innerHTML='Invalid login'})
}

function openApp(){
 document.getElementById('loginPage').style.display='none';
 document.getElementById('appPage').style.display='flex';
 loadDashboard();
}

function authHeaders(){return {'Content-Type':'application/json','Authorization':'Bearer '+token}}

function showPage(page){
 document.querySelectorAll('.main section').forEach(x=>x.style.display='none');
 document.getElementById(page).style.display='block';
 document.getElementById('pageTitle').innerHTML=page.toUpperCase();
 if(page==='dashboard')loadDashboard();
 if(page==='tasks')loadTasks();
 if(page==='companies')loadCompanies();
 if(page==='users')loadUsers();
}

function loadDashboard(){
 fetch('/api/tasks',{headers:authHeaders()}).then(r=>r.json()).then(data=>{
 let tasks=data.rows||data||[];
 totalTasks.innerHTML=tasks.length;
 openTasks.innerHTML=tasks.filter(t=>t.status!=='Completed').length;
 completedTasks.innerHTML=tasks.filter(t=>t.status==='Completed').length;
 dashboardTasks.innerHTML=tasks.slice(0,10).map(t=>`<tr><td>${t.task_code||t.id}</td><td>${t.company||''}</td><td>${t.status}</td><td>${t.assignee||''}</td></tr>`).join('');
 });
}

function loadTasks(){
 fetch('/api/tasks',{headers:authHeaders()}).then(r=>r.json()).then(data=>{
 let tasks=data.rows||data||[];
 taskTable.innerHTML=tasks.map(t=>`<tr><td>${t.id}</td><td>${t.task_code||''}</td><td>${t.status}</td><td><button onclick="updateTask(${t.id})">Update</button></td></tr>`).join('');
 });
}

function createTask(){
 let company=document.getElementById('taskCompany').value;
 let description=document.getElementById('taskTitle').value;
 let status=document.getElementById('taskStatus').value;
 fetch('/api/tasks',{method:'POST',headers:authHeaders(),body:JSON.stringify({company,description,status})})
 .then(()=>{loadTasks();loadDashboard();alert('Task created successfully')})
}

function updateTask(id){
 fetch('/api/tasks/'+id,{method:'PATCH',headers:authHeaders(),body:JSON.stringify({status:'Completed'})}).then(()=>{loadTasks();loadDashboard()})
}

function loadCompanies(){
 fetch('/api/companies',{headers:authHeaders()}).then(r=>r.json()).then(d=>companyTable.innerHTML=(d||[]).map(c=>`<tr><td>${c.name}</td></tr>`).join(''))
}
function loadUsers(){
 fetch('/api/users',{headers:authHeaders()}).then(r=>r.json()).then(d=>userTable.innerHTML=(d||[]).map(u=>`<tr><td>${u.name}</td></tr>`).join(''))
}
function askAI(){
 let q=document.getElementById('aiInput').value;
 aiResponse.innerHTML='Golden AI analysing: '+q+'<br><br>Next version will connect this assistant with task database.';
}

if(token) window.onload=openApp;
