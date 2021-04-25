import Axios from 'axios'
var axios = Axios.create({
    withCredentials: true
})

// const BASE_URL = 'http://localhost:3030/api/attack';
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/attack'
    : '//localhost:3030/api/attack'


export const attackService = {
    query,getAttackById
}

async function query(filterBy){
    try{
        const res = await axios.get(BASE_URL,{ params: filterBy });
        return res.data;
    }
    catch(err){
        console.log('error with query ',err);
    }
}

async function getAttackById(id){
    try {
        const res = await axios.get(`${BASE_URL}/${id}`)
        return res.data;
    }
    catch(err){
        console.log('error with getting attack by id',err)
    }
}

