export default {
    async filterTaskList(context, payload) {
        const userId = context.getters.getUserId;
        const response = await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}/todos.json`);

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error("Failed to fetch todos list!")
            throw error;
        }

        const filteredTaskList = [];
        for (let t in responseData) {
            if (responseData[t].title.toLowerCase().includes(payload) || responseData[t].subTitle.toLowerCase().includes(payload)) {
                filteredTaskList.push(responseData[t]);
            }
        }
        context.commit("setTaskList", filteredTaskList);
    },
    async addNewTaskToTaskList(context, payload) {
        const userId = context.getters.getUserId;
        const response = await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}/todos.json`, {
            method: 'POST',
            body: JSON.stringify({
                id: payload.id,
                title: payload.title,
                subTitle: payload.subTitle,
                dueDate: payload.dueDate,
                done: payload.done
            })
        });

        if (!response.ok) {
            const error = new Error("Failed to add new task! Please try again later.");
            throw error;
        }
        const response2 = await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}/todos.json`);
        const response2Data = await response2.json();
        var firebaseIdOfNewlyAddedItem = "";
        for (let t in response2Data) {
            if (response2Data[t].id === payload.id) {
                firebaseIdOfNewlyAddedItem = t;
            }
        }
        context.commit("addNewTask", {
            ...payload,
            firebaseId: firebaseIdOfNewlyAddedItem
        });
    },
    async completeCurrentTask(context, payload) {
        const userId = context.getters.getUserId;

        await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}/todos/${payload.firebaseId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                done: payload.done,
            })
        });
        context.commit("completeTask", payload);
    },
    async deleteCurrentTask(context, payload) {
        const userId = context.getters.getUserId;

        await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}/todos/${payload.firebaseId}.json`, {
            method: 'DELETE'
        });
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
            isAuth: true
        })

    },
    async login(context, payload) {
        //const userId = context.getters.getUserId;
        const response = await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users.json`);

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error("Failed to Authenticate!");
            throw error;
        }

        var selectedUser = null;
        var userId = null;
        for (let user in responseData) {
            const currentUser = responseData[user];
            // console.log("current usr", currentUser)
            if (currentUser.email == payload.enteredEmail && currentUser.password == payload.enteredPassword) {
                selectedUser = currentUser;
                userId = user;
                //console.log(selectedUser, user)
                break;
            } else {
                console.log(currentUser.email, payload.enteredEmail)
                const error = new Error("Failed to Authenticate!");
                throw error;
            }
        }
        //store data in browser local storage
        localStorage.setItem("userId", userId);
        localStorage.setItem("firstName", selectedUser.firstName);
        localStorage.setItem("lastName", selectedUser.lastName);

        context.commit("setUser", {
            id: userId,
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            isAuth: true
        })
        context.dispatch("fetchTodos");

    },

    async fetchTodos(context) {
        const userId = context.getters.getUserId;
        const response = await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}/todos.json`);

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error("Failed to fetch todos list!")
            throw error;
        }

        const tempTaskList = [];
        for (let t in responseData) {
            const currItemDueDate = responseData[t].dueDate ? responseData[t].dueDate : null;
            const task = {
                ...responseData[t],
                dueDate: currItemDueDate,
                firebaseId: t
            };
            tempTaskList.push(task);
        }
        context.commit("setTaskList", tempTaskList);
    },
    async updateTodoDescription(context, payload) {
        const userId = context.getters.getUserId;

        await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}/todos/${payload.firebaseId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: payload.newTitle,
                subTitle: payload.newSubTitle
            })
        });
        context.commit("updateTaskDescription", payload);
    },
    async updateDueDate(context, payload) {
        const userId = context.getters.getUserId;

        await fetch(`https://todo-app-a4835-default-rtdb.firebaseio.com/users/${userId}/todos/${payload.firebaseId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                dueDate: payload.newDueDate,
            })
        });
        context.commit("updateDueDate", payload);
    },
    autoLogin(context) {
        // get data from browser local storage
        const userIdInLocalStorage = localStorage.getItem("userId");
        const firstNameInLocalStorage = localStorage.getItem("firstName");
        const lastNameInLocalStorage = localStorage.getItem("lastName");
        if (userIdInLocalStorage && firstNameInLocalStorage && lastNameInLocalStorage) {
            context.commit("setUser", {
                id: userIdInLocalStorage,
                firstName: firstNameInLocalStorage,
                lastName: lastNameInLocalStorage,
                isAuth: true
            })
            context.dispatch("fetchTodos");
        }
    },
    logout(context) {
        localStorage.removeItem("userId");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");

        context.commit("setUser", {
            id: null,
            firstName: '',
            lastName: '',
            isAuth: false
        })
    }
};