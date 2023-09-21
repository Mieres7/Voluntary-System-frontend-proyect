import { ref } from 'vue'
import axios from 'axios'

export default class AuthService{
    constructor() {
        this.jwt = ref()
    }

    getJwt(){return this.jwt}

    async login(email, password){
        try {
            const res = await axios.post('ruta', {
                mail: email,
                password: password,
            })
            
            const response = await res.json()

        } catch (error) {
            console.log(error);
        }
    }

    async register(nombre, email, password){
        try{
            const res = await axios.post('ruta', {   
                nombre: nombre,
                mail: email,
                password: password,
            })
            
            const response = await res.json()

        } catch (error) {
            console.log(error);
        }
    }
}