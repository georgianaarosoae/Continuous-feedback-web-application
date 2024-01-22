import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:9000/api"
})

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response){
            console.error("Error response:",error.response.data);
        }else if(error.request){
            console.error("No response received:",error.request);
        }else{
            console.error("Error setting up the request:",error.message);
        }
        return Promise.reject(error);
    }
);

async function getAxios(url, queryParams, id){
    let newUrl=!id?url:url+"/"+id;
    return (await api.get(newUrl,{params: queryParams})).data;
}

async function postAxios(url,item){
    return (await api.post(
        url, 
        item,
        {
            headers:{
                "Content-Type":"application/json"
            }
        }
    )).data;
}

async function putAxios(url,id,item){
    return (await api.put(
        url+"/"+id,
        item,
        {
            headers:{
                'Content-Type':"application/json"
            }
        }
    )).data
}

async function removeAxios(url,id){
    return (await api.delete(
        url+"/"+id
    )).data
}
export {getAxios,postAxios,putAxios,removeAxios}