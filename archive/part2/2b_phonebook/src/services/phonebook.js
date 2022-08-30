import axios from 'axios'
const baseUrl = "/api/db"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(res => res.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}

const replaceNumber = (updatePerson) => {
  const request = axios.put(`${baseUrl}/${updatePerson.id}`, updatePerson)
  return request.then(res => res.data)
}

const exportObj = { getAll, create, deletePerson, replaceNumber }

export default exportObj;