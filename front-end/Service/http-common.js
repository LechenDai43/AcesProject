import axios from "axios";

const localURL = "http://localhost:8080/"
//const cloudURL = "http://ec2-100-26-161-246.compute-1.amazonaws.com:8080/"

export default axios.create({
    baseURL: localURL,
    headers: {
        "Content-type": "application/json"
    }
});
