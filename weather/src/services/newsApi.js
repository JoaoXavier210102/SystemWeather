import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
});

export default newsApi;