import http from "./http-common"

class UserService {
    login(data) {
        return http.get("/aces/user", data);
    }

    register(data) {
        return http.post("/aces/user", data);
    }
}

export default new UserService();
