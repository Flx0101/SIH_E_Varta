
let select = ``;

let url = `https://127.0.0.1:3000/`;
function radioVal(event) {
    select = event.target.value;
    console.log(select)
}

async function signIn() {
    console.log("inside sign in")
    // let result = ''
    let data = {
        email: document.getElementById('email').value,
        psd: document.getElementById('password').value,
    }
    console.log(data)
    console.log("inside sign in")
     switch(select){
         case "Lawyer":{
             result = await axios({
                 url: url+'lawyerLogin',
                 method:'POST',
                 headers: {"content-type": 'application/json' },
                 data: data
             })
             console.log(data+"inside lawyer")
             break
         }
         case "Police":{
             result = await axios({
                 url: url+'policeColl',
                 method:'POST',
                 headers: {"content-type": 'application/json' },
                 data: data
             })
             console.log(data+"inside police")
             break
         }

         case "Judge":{
             result = await axios({
                 url: url+'judgeLogin',
                 method:'POST',
                 headers: {"content-type": 'application/json' },
                 data: data
             })
             console.log(data+"inside judge")
             break
         }
         case "User":{
             result = await axios({
                 url: url+'login',
                 method:'POST',
                 headers: {"content-type": 'application/json' },
                 data: data
             })
             console.log(data+"inside user")
            break
         }
     }
     localStorage.setItem("token",result.data.token);
}

async function register () {
    let result, data
    data = {
        username: document.getElementById('name').value,
        email: document.getElementById('emailId').value,
        psw: document.getElementById('pass').value,
        category: select
    }
    result = await axios({
        url: url+'register',
        method:'POST',
        headers: {"content-type": 'application/json' },
        data: data
    })
    localStorage.setItem("token",result.data.token);
    console.log(data)
}
