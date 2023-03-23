import axios from 'axios'

 const Post = (url, body, token=null) => {
  //return axios.post(url, data)
   return axios({
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`,
    },
    data: body
  })
}


 const Get = (url,token=null) => {
    //return axios.post(url, data)
     return axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
}
  

 const Put = (url, body, token=null) => {
    //return axios.post(url, data)
     axios({
      method: "put",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
      data: body
    })
}
  
 const Del = (url, body, token=null) => {
    //return axios.post(url, data)
 axios({
      method: "delete",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        }
    })
 }
  
 export { Post, Get, Put, Del}