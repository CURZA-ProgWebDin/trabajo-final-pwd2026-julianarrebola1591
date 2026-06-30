import { instance as axios } from '../plugins/axios'

class ProveedoresService {
  async getAll() {
    const response = await axios.get('/proveedores/')
    return response.data
  }

  async create(proveedor) {
    const response = await axios.post('/proveedores/', proveedor)
    return response.data
  }
  async update(id, proveedor) {
    const response = await axios.put(`/proveedores/${id}`, proveedor)
    return response.data
  }

  async delete(id) {
    return await axios.delete(`/proveedores/${id}`)
  }
}

export default new ProveedoresService()
