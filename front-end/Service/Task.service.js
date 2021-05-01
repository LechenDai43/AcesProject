import http from "./http-common"

class TaskService {
    getTask(data) {
        return http.get("/aces/task", data);
    }

    deleteTask(data) {
        return http.delete("/aces/task", data);
    }

    createTask(data) {
        return http.post("/aces/task", data);
    }

    modifyTask(data) {
        return http.put("/aces/task", data);
    }

    getTaskStatus(data) {
        return http.get("/aces/task/status", data);
    }

    setTaskStatus(data) {
        return http.put("/aces/task/status", data);
    }

    setTaskLength(data) {
        return http.post("/aces/task/schedule/length", data);
    }

    getTaskLength(data) {
        return http.get("/aces/task/schedule/length", data);
    }

    getDailySchedule(data) {
        return http.get("/aces/task/schedule/time", data);
    }

    alterDailySchedule(data) {
        return http.put("/aces/task/schedule/time", data);
    }

    addDailySchedule(data) {
        return http.post("/aces/task/schedule/time", data);
    }

    removeDailySchedule(data) {
        return http.delete("/aces/task/schedule/time", data);
    }

    getTaskDueDate(data) {
        return http.get("/aces/task/due", data);
    }

    setTaskDueDate(data) {
        return http.put("/aces/task/due", data);
    }

    getTaskEstimation(data) {
        return http.get("/aces/task/estimation", data);
    }

    setTaskEstimation(data) {
        return http.put("/aces/task/estimation", data);
    }
}

export default new TaskService();
