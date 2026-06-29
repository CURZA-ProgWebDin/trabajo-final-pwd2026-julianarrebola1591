import { instance as axios } from '../plugins/axios'

class ProductosService {
  async getAll() {
    const response = await axios.get('/productos/')
    return response.data
  }

  async create() {
    const response = await axios.post('/productos/')
    return response.data
  }
}

export default new ProductosService()
