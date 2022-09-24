export default {
    setTaskList(state, payload) {
        state.tasks = payload;
    },
    addNewTask(state, payload){
        state.tasks.push(payload);
    },
    updateTaskDescription(state,payload){
        const updatedTask =  state.tasks.filter((t) => t.id !== payload.id);
        updatedTask.title = payload.newTitle;
        updatedTask.subTitle = payload.newSubTitle;
        console.log(state.tasks)
    },
    completeTask(state, payload){
        const task = state.tasks.find((t) => t.id === payload);
        task.done = !task.done;

    },
    deleteTask(state, payload){
        const filteredTask =  state.tasks.filter((t) => t.id !== payload)
        state.tasks = filteredTask;
    }, 
    setUser(state, payload){
        state.userId = payload.id;
        state.userFirstName = payload.firstName,
        state.userLastName = payload.lastName,
        state.isAuthenticated = true
    }
};