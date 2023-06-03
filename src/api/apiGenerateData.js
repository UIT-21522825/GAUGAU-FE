import { Axios } from "../service/axios";

export default apiGenerateData = {
    openPlayground: (query) => Axios.post('/api/chatgpt/chat', query)
}