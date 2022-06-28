import axios from "axios";

// const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
axios.defaults.baseURL = "https://localhost:5001/api/";
axios.defaults.withCredentials = true;
const responseBody = (response) => response.data;


const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};


const Agenda = {
  getEventById: (id) => requests.get(`AgendaList/${id}`),
  getAllEvents: () => requests.get("AgendaList"),
  putEvent: (body) => requests.put("AgendaList", body),
  postEvent: (body) => requests.post("AgendaList", body),
  deleteEvent: (id) => requests.delete(`AgendaList/${id}`),
};

const httpAgent = {
 Agenda
};

export default httpAgent;
