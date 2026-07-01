import { instance as axios } from '../plugins/axios'

class ProductosService {
  async getAll() {
    const response = await axios.get('/productos/')
    return response.data
  }

  async create(producto) {
    const response = await axios.post('/productos/', producto)
    return response.data
  }

  async update(id, producto) {
    const response = await axios.put(`/productos/${id}`, producto)
    return response.data
  }

  async delete(id) {
    return await axios.delete(`/productos/${id}`)
  }
}

export default new ProductosService()
