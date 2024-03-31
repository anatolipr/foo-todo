
export type TodoMain = {
    _id?: string;
    name?: string;
    todoLists: TodoList[];
    minimizedTodoLists: TodoList[];
    createdTime?: number;
    key?: number
}


export type TodoStats = {
    percent: string;
    unfinishedText: string;
};

export type TodoListTextAndMeta = {
    text:        string;
    color?:      string;
    emoji?:      string;
}

export type TodoList = {
    _id:         string;
    _rev:        string;
    name:        string;
    createdTime: number;
    todoItems:   TodoItem[];
    newValue:    string;
    stats:       TodoStats;
    color?:      string;
    emoji?:      string;
    key?:        number;
}

export type TodoItem = {
    createdTime:   number;
    completedTime?: number;
    completed:     boolean;
    value:        string;
    color?:       string;
    emoji?:      string;
}

