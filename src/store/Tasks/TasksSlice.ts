import {createSlice} from "@reduxjs/toolkit";
import {TaskStatus, TaskType} from "../../model/taskTypes.ts";

interface StateType {
    tasks: TaskType[];
    filteredTasks: TaskType[];
    filter: TaskStatus
    task: TaskType | null
}

const initialState: StateType = {
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    filteredTasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    filter: "all",
    task: null
};

function filterTasks(state: StateType) {
    if (state.filter === "all")
        state.filteredTasks = state.tasks;
    else
        state.filteredTasks = state.tasks.filter((task) => task.status === state.filter);
}

const TasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action) => {
            localStorage.setItem("tasks", JSON.stringify(action.payload));
            state.tasks = action.payload;
            if (state.filter === "all")
                state.filteredTasks = action.payload;
            else
                state.filteredTasks = action.payload.filter((task: TaskType) => task.status === state.filter);
        },
        setFilter: (state, action) => {
            state.filter = action.payload
            filterTasks(state)
        },
        changeTaskStatus: (state, action) => {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload) {
                    task.status = task.status === "completed" ? "uncompleted" : "completed";
                }
                return task;
            });
            filterTasks(state);
        },
        setTask: (state, action) => {
            state.task = action.payload
        },
        deleteTask: (state, action) => {
            const filteredTasks = state.tasks.filter((item) => item.id !== action.payload)
            state.tasks = filteredTasks
            filterTasks(state)
            localStorage.setItem("tasks", JSON.stringify(filteredTasks));
        }

    },
});

export const {
    setTasks,
    setFilter,
    changeTaskStatus,
    setTask,
    deleteTask
} = TasksSlice.actions;
export default TasksSlice.reducer;
