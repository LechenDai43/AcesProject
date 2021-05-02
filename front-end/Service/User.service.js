import http from "./http-common"

class UserService {
    loginUser(data) {
        return http.put("/aces/user", data);
    }

    registerUser(data) {
        console.log(data);
        return http.post("/aces/user", data);
    }
}

export default new UserService();
