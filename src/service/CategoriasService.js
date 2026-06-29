import { instance as axios } from '../plugins/axios'

class CategoriasService {
  async getAll() {
    const response = await axios.get('/categorias/')
    return response.data
  }

  async create(categoria) {
    const response = await axios.post('/categorias/', categoria)
    return response.data
  }
  async update(id, categoria) {
    const response = await axios.put(`/categorias/${id}`, categoria)
    return response.data
  }

  async destroy(id) {
    return await axios.delete(`/categorias/${id}`)
  }
}

export default new CategoriasService()
