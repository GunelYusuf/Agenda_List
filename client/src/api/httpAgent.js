import axios,{AxiosError,AxiosResponse} from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
axios.defaults.baseURL = "https://localhost:5001/api/";
axios.defaults.withCredentials = true;
const responseBody = (response) => response.data;

axios.interceptors.response.use(async response=>{

    await sleep();
    return response
 },
    (error)=>{
     const { data, status } = error?.response;
    
        switch (status) {
            case 400:
                if (data.errors)
                {
                    const modelStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key])
                        }
                    }
                     
                }
                toast.error(data.title);
                break;
         case 401:
             toast.error(data.title)
             break;
         case 500:
             // navigate('/server-error');
             break;
         case 404:
             toast.error(data.title);
             break;
         default:
             break;
     }
     return Promise.reject(error.response);
   });



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
