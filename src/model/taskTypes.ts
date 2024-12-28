export type TaskType = {
    id: string
    title: string
    details: string
    status: TaskStatus
}

export type TaskStatus ="all"|"uncompleted"|"completed"