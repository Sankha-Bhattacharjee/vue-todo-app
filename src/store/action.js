export default {
    updateTaskList(context, payload) {
        context.commit("setTaskList", payload);
    },
    addNewTaskToTaskList(context, payload) {
        context.commit("addNewTask", payload);
    },
    completeCurrentTask(context, payload) {
        context.commit("completeTask", payload);
    },
    deleteCurrentTask(context, payload) {
        context.commit("deleteTask", payload);
    },
    async signup(context, payload) {
        const userId = context.getters.getUserId;
        const response = await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                firstName: payload.firstName,
                lastName: payload.lastName
            })
        });

        if (!response.ok) {
            const error = new Error("Failed to Register!");
            throw error;
        }

        context.commit("setUser", {
            id: userId,
            firstName: payload.firstName,
            lastName: payload.lastName,
        })

    },
    async login(context, payload) {
        const userId = context.getters.getUserId;
        const response = await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users.json`);

        const responseData = await response.json();
         console.log(responseData, payload)

        if (!response.ok) {
            const error = new Error("Failed to Authenticate!");
            throw error;
        }
        
        for(let user in responseData) {
            const currentUser = responseData[user];
            console.log("current usr", currentUser)
            if(currentUser.email == payload.enteredEmail && currentUser.password == payload.enteredPassword){
                const selectedUser = currentUser;
                console.log(selectedUser)
                break;
            }else{
                console.log(typeof(currentUser.email), typeof(payload.enteredEmail))
                const error = new Error("Failed to Authenticate!");
                throw error;
            }
        }

        context.commit("setUser", {
            id: userId,
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
        })

    }
};