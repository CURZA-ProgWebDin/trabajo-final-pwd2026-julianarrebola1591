import { instance as axios } from '../plugins/axios'

class AuthService {
  auth_user = null

  async login(user) {
    try {
      const response = await axios.post('/login', user)

      console.log('Respuesta del backend:', response.data)

      this.auth_user = response.data
      return response.data
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message)
      throw error
    }
  }

  async register(new_user) {
    await axios
      .post('/register', new_user)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error.status))
  }
}

export default AuthService
