import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const weatherApi = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
});

export default weatherApi;