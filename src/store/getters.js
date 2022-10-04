export default {
    getTaskList(state) {
        return state.tasks;
    },
    getUserId(state){
        return state.userId;
    },
    getUserFirstName(state){
        return state.userFirstName;
    },
    getUserLastName(state){
        return state.userLastName;
    },
    getIsAuthenticated(state){
        return state.isAuthenticated;
    }
};