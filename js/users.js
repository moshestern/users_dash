const userBox = document.getElementById('user-box');
const formBox = document.getElementById('form-box');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginMsg = document.querySelectorAll('.login-msg')[0];
const logoutBtn = document.querySelectorAll('.logout-btn')[0];
let usersArr = [];

if (window.localStorage.getItem('current') != null) {
    userBox.style.display = 'none';
    loginMsg.innerHTML = 'Welcome ' + window.localStorage.getItem('current');
}

const userForm = (btn, id, signup) => {
    let userTemplate = `
        <form id="user-form">
            ${signup ? '<div><input id="user-name" type="text" required placeholder="Name"></div>' : ''}
            <div><input id="user-email" type="email" required placeholder="Email"></div>
            <div><input id="user-pass" type="password" required placeholder="Password"></div>
            ${signup ? '<div><input id="user-confirm-pass" type="password" required placeholder="Confirm Password"></div>' : ''}
            <div><button type="submit" id=${id}>${btn}</button></div>
            <div class="form-msg"></div>
            <div id="form-back"><-- back</div>
        </form>
    `;
    document.querySelectorAll('.welcome-btns')[0].style.display = 'none';
    formBox.innerHTML = userTemplate;
    document.getElementById('form-back').addEventListener('click', ()=>{
        formBox.innerHTML = '';
        document.querySelectorAll('.welcome-btns')[0].style.display = 'block';
    })
} 

const getUserAgent = () => {
    const agent = navigator.userAgent;
    if(agent.indexOf("Chrome") != -1 ) { return 'Chrome' }
    else if(agent.indexOf("Safari") != -1) {return 'Safari'}
    else if(agent.indexOf("Firefox") != -1) {return 'Firefox'}
    else if((agent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {return 'IE'}  
    else {return 'unknown'}
}

const signup = (ev) => {
    ev.preventDefault();
    document.querySelectorAll('.form-msg')[0].innerHTML = '';
    let userName = document.getElementById("user-name").value;
    let userEmail = document.getElementById("user-email").value;
    let userPass = document.getElementById("user-pass").value;
    let userConfirmPass = document.getElementById("user-confirm-pass").value;
    if (userPass != userConfirmPass) {
        document.querySelectorAll('.form-msg')[0].innerHTML = '* passwords does not match';
        return;
    }
    let loginTime = new Date().getTime();
    let userIp = window.userIp;
    let userInfo = {
        'user name': userName,
        'user email': userEmail,
        'user pass': userPass,
        'register time': loginTime,
        'login time': loginTime,
        'user ip': userIp,
        'login count': 1,
        'user agent': getUserAgent()
    }
    
    if (window.localStorage.getItem('users') === null) {
        usersArr.push(userInfo);
        window.localStorage.setItem('users', JSON.stringify(usersArr));
    } else {
        usersArr = JSON.parse(localStorage.getItem("users"));
        for(let user in usersArr){
            if(usersArr[user]["user email"] == userEmail){
                document.querySelectorAll('.form-msg')[0].innerHTML = '* email already exist';
                return;
            }
        }

        usersArr.push(userInfo);
        window.localStorage.setItem('users', JSON.stringify(usersArr));
        window.localStorage.setItem('current', userName);
    }
    userBox.style.display = 'none';
    loginMsg.innerHTML = `Welcome ${userName}`;
    createDash();
}

signupBtn.addEventListener('click', function () {
    userForm('Signup', 'submit-signup', true);
    document.getElementById('user-form').addEventListener('submit', signup); 
});



const login = (ev) => {
    ev.preventDefault();
    document.querySelectorAll('.form-msg')[0].innerHTML = '';
    let userEmail = document.getElementById("user-email").value;
    let userPass = document.getElementById("user-pass").value;

    if (window.localStorage.getItem('users') === null) {
        document.querySelectorAll('.form-msg')[0].innerHTML = '* user does not exist';
        return;
    } else {
        usersArr = JSON.parse(localStorage.getItem("users"));
        if (!(usersArr.some(item => item["user email"] === userEmail))) {
            document.querySelectorAll('.form-msg')[0].innerHTML = '* user does not exist';
            return;
        }
        for(let user in usersArr){
            if(usersArr[user]["user email"] == userEmail){
                if(usersArr[user]["user pass"] != userPass) {
                    document.querySelectorAll('.form-msg')[0].innerHTML = '* wrong password';
                    return;
                } else {
                    let loginTime = new Date().getTime();
                    let userIp = window.userIp;

                    usersArr[user]["login time"] = loginTime;
                    usersArr[user]["user ip"] = userIp;
                    usersArr[user]["login count"] += 1;
                    usersArr[user]["user agent"] = getUserAgent(); 

                    window.localStorage.setItem('users', JSON.stringify(usersArr));
                    window.localStorage.setItem('current', usersArr[user]["user name"]);
                    userBox.style.display = 'none';
                    loginMsg.innerHTML = `Welcome ${usersArr[user]["user name"]}`;
                    createDash();
                } 
            }
        }
    } 
}

loginBtn.addEventListener('click', function () {
    userForm('Login', 'login-signup', false);
    document.getElementById('user-form').addEventListener('submit', login); 
});


logoutBtn.addEventListener('click', () => {
    window.localStorage.removeItem('current');
    document.getElementById('dash-popup').innerHTML = '';
    document.getElementById('dash-box').innerHTML = '';
    document.querySelectorAll('.login-msg')[0].innerHTML = '';
    document.getElementById('form-box').innerHTML = '';
    document.querySelectorAll('.welcome-btns')[0].style.display = 'block';
    userBox.style.display = 'block';
});




