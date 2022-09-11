export default {
    getTaskList(state) {
        return state.tasks;
    },
    getsearchedTaskList(state){
        return state.searchedTasks;
    },
    getUserId(state){
        return state.userId;
    }
};