export default {
    setTaskList(state, payload) {
        console.log(payload);
        state.searchedTasks = payload;
    },
    addNewTask(state, payload){
        state.tasks.push(payload);
    },
    completeTask(state, payload){
        const task = state.tasks.find((t) => t.id === payload);
        task.done = !task.done;

    },
    deleteTask(state, payload){
        const filteredTask =  state.tasks.filter((t) => t.id !== payload)
        state.tasks = filteredTask;
    }, setUser(state, payload){
        state.token = payload.token;
        state.userId = payload.id;
        state.tokenExpiration = payload.tokenExpiration;
    }
};