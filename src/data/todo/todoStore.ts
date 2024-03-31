import type {TodoItem, TodoList, TodoListTextAndMeta, TodoMain, TodoStats} from './todoTypes.js'

import Foo from 'avos/src/foo-store/foo.js'
import { tick } from 'svelte'

import { v4 as uuidv4 } from 'uuid';

import { copyToClipboard, getCurrentEpoch, paste } from '../../util.js';

import { doPrompt } from '../../components/prompt/prompt.js';


export const $todo: Foo<TodoMain> = new Foo<TodoMain>({
    ... JSON.parse(localStorage?.getItem('fooTodos')||'{ "todoLists":[], "minimizedTodoLists": [] }')
})

$todo.subscribe((todo: Readonly<TodoMain>) => {
    localStorage?.setItem('fooTodos', JSON.stringify(todo))
}, false)

export function about(): void {
    alert('Foo Todo by Anatoli Radulov')
}

//***** Main *****

export function renameTodoMain(): void {

    $todo.update((todo) => {
        const newName = prompt('Enter new name', todo.name);
        if (newName !== null) {
            todo.name = newName
        }
        return todo;
    })

}

export function newTodoMain(): void {

    $todo.update((todo) => {
        const newName = prompt('Enter new name', todo.name + ' (new)');
        
        if (newName != null && confirm('Are you sure?')) {
            todo.name = newName || 'unnamed';
            todo.createdTime = getCurrentEpoch();
            todo._id = uuidv4();
            todo.todoLists = [];
            todo.minimizedTodoLists = [];
        }

        return todo;
    })
    
}

//***** Lists ******

export async function addTodoList(name: string = "Unnamed", shouldPrompt: boolean = false): Promise<void> {

    let input: TodoListTextAndMeta | undefined = {
        text: name
    };

    if (shouldPrompt) {
        input = await doPrompt('List name', {text: name});
        if (input === undefined || input.text.trim() === '') {
            return;
        }
    }

    const newTodoList: TodoList = {
        _id: uuidv4(),
        _rev: 'a',
        createdTime: getCurrentEpoch(),
        name: input!.text,
        emoji: input?.emoji,
        color: input?.color,
        todoItems: [],
        newValue:'',
        stats: getTodoStats([]),
        key:0
    }

    const todoLists = $todo.get().todoLists;
    todoLists.push(newTodoList)
    $todo.update((todo) => { todo.todoLists = todoLists; return todo });

    await tick()

    const rootEl = document.getElementById('root');
    if (rootEl) {
        rootEl.scrollLeft = rootEl.scrollWidth;
    }
    

}

export function setTodoListNewValue(listIndex: number, newValue: string): void {
    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].newValue = newValue;
    $todo.update(todo => {todo.todoLists = todoLists; return todo})
}

export function removeTodoList(listIndex: number) {
    if (!confirm('are you sure?')) {
        return
    }
    const todoLists = $todo.get().todoLists;
    todoLists.splice(listIndex, 1);
    $todo.update(todo => {todo.todoLists = todoLists; return todo})

}

export function copyTodoList(listIndex: number): void {
    const todoLists = $todo.get().todoLists;
    const content = JSON.stringify(todoLists[listIndex]);

    copyToClipboard(content);
}

export async function pasteTodoList(): void {
    const text = await paste();
    if (text.indexOf('"todoItems"') > -1) {

        $todo.update(todo => {
            todo.todoLists.push(JSON.parse(text));
            return todo;
        })

    } else {
        alert('not supported')
    }
}

export function setTodoListName(listIndex: number, name: string): void {
   
    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].name = name;
    todoLists[listIndex].key = Math.random()
    $todo.update(todo => {todo.todoLists = todoLists; return todo})

}


//***** Lists -> TODOs ******

/**
 * add todo to a todo list
 * @param value - string of the new todo
 * @param listIndex - index of the TODO list
 */
export async function addTodo(listIndex: number): Promise<void> {

    const todoLists = $todo.get().todoLists;

    const newTodoItem: TodoItem = {
        createdTime: getCurrentEpoch(),
        completed: false,
        completedTime: undefined,
        value: todoLists[listIndex].newValue || 'specify...'
    }
    
    todoLists[listIndex].todoItems.push(newTodoItem);
    todoLists[listIndex].stats = getTodoStats(todoLists[listIndex].todoItems)
    todoLists[listIndex].newValue = ''
    
    todoLists[listIndex].key = Math.random()
    $todo.update(todo => {todo.todoLists = todoLists; return todo})

    const objDiv = document.getElementById('todoitems' + listIndex)
    if (objDiv) {
        await tick();
        objDiv.scrollTop = objDiv.scrollHeight;
    } 

    document.getElementById('todoinput' + listIndex)?.focus()
}

/**
 * remove an item from todo items
 * @param listIndex - index of the TODO list
 * @param todoItemIndex - index of the todo item to remove
 */
export function removeTodoItem(listIndex: number, todoItemIndex: number): void {

    if (!confirm('are you sure?')) {
        return
    }

    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].todoItems.splice(todoItemIndex, 1);
    todoLists[listIndex].stats = getTodoStats(todoLists[listIndex].todoItems)
    todoLists[listIndex].key = Math.random()
    $todo.update(todo => {todo.todoLists = todoLists; return todo})
    
}

export function setTodoItemValue(listIndex: number, todoItemIndex: number, value: string) {
    
    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].todoItems[todoItemIndex].value = value;
    todoLists[listIndex].key = Math.random()
    $todo.update(todo => {todo.todoLists = todoLists; return todo})
    
}

export function setTodoItemCompleted(listIndex: number, todoItemIndex: number, completed: boolean) {

    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].todoItems[todoItemIndex].completed = completed;
    todoLists[listIndex].todoItems[todoItemIndex].completedTime = 
        completed ? getCurrentEpoch() : undefined;

    todoLists[listIndex].stats = getTodoStats(todoLists[listIndex].todoItems)
    todoLists[listIndex].key = Math.random()
    $todo.update(todo => {todo.todoLists = todoLists; return todo})

}

export function clearTodoItems(listIndex: number): void {
    if (!confirm('are you sure?')) {
        return
    }
    const todoLists = $todo.get().todoLists;
    todoLists[listIndex].todoItems = [];
    todoLists[listIndex].stats = getTodoStats(todoLists[listIndex].todoItems)
    todoLists[listIndex].newValue = ''
    todoLists[listIndex].key = Math.random()
    $todo.update(todo => {todo.todoLists = todoLists; return todo})

}

export const NOTHING_TODO_LABEL = 'Nothing to do';
export const ALL_DONE_LABEL = 'All done!';

/**
 * get todo stats based on completed vs total count
 * @param todos 
 * @returns stats for this list
 */
export function getTodoStats(todos: TodoItem[]): TodoStats {

    let totalTodos: number = todos.length;
    let completedTodos: number = getNumberOfCompletedTodos(todos);

    let percent: string = '';

    let unfinishedText = '';
    if (totalTodos === 0) {
        unfinishedText = NOTHING_TODO_LABEL;
    } else {
        if (totalTodos === completedTodos) {
            unfinishedText = ALL_DONE_LABEL
        } else {
            unfinishedText = `${completedTodos} of ${totalTodos} finished`
        }

        percent = Math.floor( ( completedTodos / totalTodos ) * 100 ) + '%'
    } 
    

    return  {
        percent,
        unfinishedText
    }

}

export function getNumberOfCompletedTodos(todos: TodoItem[]): number {
    return todos.filter(todo => todo.completed).length;
}


//User input

export async function updateTodoListName(listIndex: number): Promise<void> {
    const todoLists = $todo.get().todoLists;
    
    const todoList: TodoList = todoLists[listIndex];

    const value: TodoListTextAndMeta | undefined = 
        await doPrompt('New list name', {
            text: todoList.name,
            emoji: todoList.emoji,
            color: todoList.color
        });
        
        
    if (value !== undefined && value.text.trim() !== '') {
        todoList.name = value.text;
        todoList.emoji = value.emoji;
        todoList.color = value.color;
        todoLists[listIndex].key = Math.random();
        $todo.update(todo => {todo.todoLists = todoLists; return todo})
    }

}

export async function updateTodoItemName(listIndex: number, todoItemIndex: number): Promise<void> {

    const todoLists = $todo.get().todoLists;
    
    const todoList = todoLists[listIndex];
    const todoItem = todoList.todoItems[todoItemIndex];
    const value: TodoListTextAndMeta | undefined = 
        await doPrompt('TODO value', {
            text: todoItem.value,
            emoji: todoItem.emoji,
            color: todoItem.color
        });

    if (value !== undefined && value.text.trim() !== '') {
        todoItem.value = value.text;
        todoItem.emoji = value.emoji;
        todoItem.color = value.color;

        todoList.key = Math.random();
        $todo.update(todo => {todo.todoLists = todoLists; return todo})
    }

}

// minimzing

export function minimizeTodoList(listIndex: number): void {

    $todo.update(todo => {
        todo.minimizedTodoLists.push({...todo.todoLists[listIndex]})
        todo.todoLists.splice(listIndex, 1);
        return todo;
    })
}

// 

export function restoreTodoList(listIndex: number): void {
    $todo.update(todo => {
        todo.todoLists.push({...todo.minimizedTodoLists[listIndex]})
        todo.minimizedTodoLists.splice(listIndex, 1);
        return todo;
    })
}

// restoreTodoList