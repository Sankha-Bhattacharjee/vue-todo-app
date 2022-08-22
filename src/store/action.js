export default {
    updateTaskList(context,payload){
        context.commit("setTaskList",payload);
    },
    addNewTaskToTaskList(context, payload){
        context.commit("addNewTask",payload);
    },
    completeCurrentTask(context, payload){
        context.commit("completeTask", payload);
    },
    deleteCurrentTask(context, payload){
        context.commit("deleteTask", payload);
    }
};