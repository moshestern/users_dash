const dashboardBox = document.getElementById('dash-box');

const createDash = () => {
    let dashboardHtml = `
        <div class='table-head'>
            <div>User name</div>
            <div>Login time</div>
            <div>User IP</div>
        </div>
    `;
    let usersArr = JSON.parse(localStorage.getItem("users"));
    for(let i=0; i < usersArr.length; i++){
        let userName = usersArr[i]['user name']; 
        let userLoginTime = new Date(usersArr[i]['login time']);
        userLoginTime = String(userLoginTime.toLocaleString());
        let userIp = usersArr[i]['user ip'];
        dashboardHtml+= `
            <div class='table-row'>
            <div>${userName}</div>
            <div>${userLoginTime}</div>
            <div>${userIp}</div>
        </div>
        `;
    }
    dashboardBox.innerHTML = dashboardHtml;
    document.querySelectorAll('.table-row').forEach((item, index) => {
        item.addEventListener('click', () => {
            let userEmail = usersArr[index]['user email']; 
            let userAgent = usersArr[index]['user agent'];
            let userRegisterTime = new Date(usersArr[index]['register time']);
            userRegisterTime = String(userRegisterTime.toLocaleString());
            let userCount = usersArr[index]['login count'];
            let popupHtml = `
                <div class='user-popup'>
                    <span id='close-popup'>X</span>
                    <div>User Email: ${userEmail}</div>
                    <div>User’s User-Agent: ${userAgent}</div>
                    <div>Register time: ${userRegisterTime}</div>
                    <div>Logins count: ${userCount}</div>
                </div>
            `;
            document.getElementById('dash-popup').innerHTML = popupHtml;
            document.getElementById('dash-popup').style.display = 'block';
            document.getElementById('close-popup').addEventListener('click', () => {
                document.getElementById('dash-popup').style.display = 'none';
                document.getElementById('dash-popup').innerHTML = '';
            })
        })
    })
}

if (window.localStorage.getItem('current') != null && window.localStorage.getItem('users') != null) {
    createDash();
}