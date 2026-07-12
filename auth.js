/*
  SORACRAFT — демо-логіка акаунтів.
  Це фронтенд-імітація: користувачі та сесія зберігаються в localStorage браузера.
  Для реального сайту цей файл потрібно замінити на запити до справжнього бекенду
  (Node/PHP/Django тощо), який хешує паролі та зберігає дані в базі даних.
*/

const SORA_USERS_KEY = 'soracraft_users';
const SORA_SESSION_KEY = 'soracraft_session';

function soraGetUsers(){
  try{
    return JSON.parse(localStorage.getItem(SORA_USERS_KEY)) || {};
  }catch(e){ return {}; }
}
function soraSaveUsers(users){
  localStorage.setItem(SORA_USERS_KEY, JSON.stringify(users));
}
function soraGetSession(){
  return localStorage.getItem(SORA_SESSION_KEY);
}
function soraSetSession(nickLower){
  localStorage.setItem(SORA_SESSION_KEY, nickLower);
}
function soraClearSession(){
  localStorage.removeItem(SORA_SESSION_KEY);
}
function soraGetCurrentUser(){
  const key = soraGetSession();
  if(!key) return null;
  const users = soraGetUsers();
  return users[key] || null;
}

const nickRe = /^[a-zA-Z0-9_]{3,16}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function soraRegister(nick, email, pass){
  const users = soraGetUsers();
  const key = nick.toLowerCase();
  if(users[key]){
    return { ok:false, error:'nick_taken' };
  }
  const user = {
    nick, email, pass,
    joined: new Date().toLocaleDateString('uk-UA', {day:'2-digit', month:'2-digit', year:'numeric'})
  };
  users[key] = user;
  soraSaveUsers(users);
  soraSetSession(key);
  return { ok:true, user };
}

function soraLogin(login, pass){
  const users = soraGetUsers();
  let user = users[login.toLowerCase()];
  if(!user){
    user = Object.values(users).find(u => u.email.toLowerCase() === login.toLowerCase());
  }
  if(!user || user.pass !== pass){
    return { ok:false, error:'invalid_credentials' };
  }
  soraSetSession(user.nick.toLowerCase());
  return { ok:true, user };
}

function soraLogout(){
  soraClearSession();
}

/* ---------- Renders the nav auth area on every page ---------- */
function soraRenderNavAuth(){
  const area = document.getElementById('navAuthArea');
  if(!area) return;
  const user = soraGetCurrentUser();
  if(user){
    area.innerHTML =
      '<a class="nav-user" href="cabinet.html">' +
        '<span class="av">' + user.nick[0].toUpperCase() + '</span>' +
        '<span>' + user.nick + '</span>' +
      '</a>';
  } else {
    area.innerHTML =
      '<a class="btn btn-ghost btn-sm" href="login.html">Увійти</a>' +
      '<a class="btn btn-primary btn-sm" href="register.html">Реєстрація</a>';
  }
}
document.addEventListener('DOMContentLoaded', soraRenderNavAuth);
