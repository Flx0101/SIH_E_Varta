import {axios} from 'axios';
let select = ``;

function radioVal(event) {
    select = event.target.value
    console.log(select)
}

async function signIn() {
    let result = ''
    let data = {
        email: document.getElementById('email').value,
        psd: document.getElementById('password').value,
    }
    console.log(data)

     switch(select){
         case "Lawyer":{
             result = await axios({
                 url: 'http://127.0.0.1:3000/lawyerLogin',
                 method:'POST',
                 headers: {"content-type": 'application/json' },
                 data: data
             })
             console.log(data+"inside lawyer")
             break

         }
         case "Police":{
             result = await axios({
                 url: 'http://127.0.0.1:3000/policeColl',
                 method:'POST',
                 headers: {"content-type": 'application/json' },
                 data: data
             })
             console.log(data+"inside police")
             break
         }

         case "Judge":{
             result = await axios({
                 url: 'http://127.0.0.1:3000/judgeLogin',
                 method:'POST',
                 headers: {"content-type": 'application/json' },
                 data: data
             })
             console.log(data+"inside judge")
             break
         }
         case "User":{
             result = await axios({
                 url: 'http://127.0.0.1:3000/login',
                 method:'POST',
                 headers: {"content-type": 'application/json' },
                 data: data
             })
             console.log(data+"inside user")
            break
         }
     }
     localStorage.setItem("token",result.data.token);
    history.push('/dashboard')
}

async function register () {
    let result, data
    data = {
        username: document.getElementById('name').value,
        email: document.getElementById('emailId').value,
        psw: document.getElementById('pass').value,
        // category: select
    }
    result = await axios({
        url: 'http://127.0.0.1:3000/register',
        method:'POST',
        headers: {"content-type": 'application/json' },
        data: data
    })
    localStorage.setItem("token",result.data.token);
    console.log(data)
}
