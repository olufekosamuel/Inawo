
export default {
    login : user => {
        return fetch(`https://inawoapi.herokuapp.com/api/users/login/`,{
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 400)
                return res.json().then(data=>data);
            else
                return { isAuthenticated: false, user:{username: "", role: ""}}
        })
    },
    register : user => {
        return fetch(`https://inawoapi.herokuapp.com/api/users/signup/`,{
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
        .then(data => data);
    },
    logout: ()=>{
        return fetch(`https://inawoapi.herokuapp.com/user/logout`)
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated: ()=>{
        return fetch(`https://inawoapi.herokuapp.com/user/authenticated`)
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data=>data);
                    else
                        return { isAuthenticated: false, user:{username: "", role: ""}}
                })
    },
    
}