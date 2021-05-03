import axios from "axios";

const localURL = "https://my-project-4261-312606.uc.r.appspot.com/"
//const cloudURL = "http://ec2-100-26-161-246.compute-1.amazonaws.com:8080/"

export default axios.create({
    baseURL: localURL,
    headers: {
        "Content-type": "application/json"
    }
});
