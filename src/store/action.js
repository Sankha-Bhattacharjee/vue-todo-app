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
    },
    async signup(context, payload){
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseBody = await response.json();

        if(!response.ok){
            const error = new Error(responseBody.message || "Failed to Authenticate!");
            throw error;
        }

        console.log(responseBody);

        context.commit("setUser",{
            token: responseBody.idToken,
            id: responseBody.localId,
            tokenExpiration: responseBody.expiresIn
        })

    }
};