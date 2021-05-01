import http from "./http-common"

class TaskService {
    getTask(data) {
        return http.put("/aces/task/get", data);
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
        return http.put("/aces/task/status/get", data);
    }

    setTaskStatus(data) {
        return http.put("/aces/task/status", data);
    }

    setTaskLength(data) {
        return http.post("/aces/task/schedule/length", data);
    }

    getTaskLength(data) {
        return http.put("/aces/task/schedule/length/get", data);
    }

    getDailySchedule(data) {
        return http.put("/aces/task/schedule/time/get", data);
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
        return http.put("/aces/task/due/get", data);
    }

    setTaskDueDate(data) {
        return http.put("/aces/task/due", data);
    }

    getTaskEstimation(data) {
        return http.put("/aces/task/estimation/get", data);
    }

    setTaskEstimation(data) {
        return http.put("/aces/task/estimation", data);
    }
}

export default new TaskService();
