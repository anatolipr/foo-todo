<script lang="ts">
  import { type TodoList } from "./data/todo/todoTypes";
  import { crop } from "./util.js";
  export let todo: TodoList;
  export let idx: number;


  import { addTodo, removeTodoItem, minimizeTodoList, clearTodoItems,
  setTodoListNewValue, removeTodoList, setTodoItemCompleted,
  updateTodoItemName, updateTodoListName } from './data/todo/todoStore.js';


</script>

<div
  style="width: 271px; height: 376px; background-color: {todo.color}"
  class="todo-card">
  <div class="card-title-line">
      <div class="card-title" on:click="{ () => updateTodoListName(idx) }">
          {@html todo.emoji || ''}
      </div>
      <div
          style="flex: 1"
          class="card-title"
          on:click="{ () => updateTodoListName(idx) }">
          { crop(todo.name) }
      </div>
      <div
          style="width: 25px; height: 30px"
          class="minimize-icon"
          on:click="{ () => minimizeTodoList(idx) }"></div>
      <div
          style="width: 25px; height: 30px"
          class="trash-icn"
          on:click="{ () => removeTodoList(idx) }"></div>
  </div>
  <div class="card-title-line">
      <div class="stat-item">{ todo.stats.percent }</div>
      <div style="text-align: center; flex: 1" class="stat-item">
          { todo.stats.unfinishedText }
      </div>
      {#if todo.todoItems.length}
      <div
          class="stat-item clear-btn"
          on:click="{ () => clearTodoItems(idx) }">
          clear
      </div>
      {/if}
  </div>
  <div
      style="overflow: scroll; flex-direction: column; gap: 4px; flex: 1; display: flex"
      id="{ 'todoitems' + idx }">
      {#each todo.todoItems as td, tdidx}
      <div
          style="background-color: {td.color || 'inherit'}"
          class="todo-line">
          <input
              style="width: 24px; height: 24px"
              class="todo-check"
              type="checkbox"
              bind:checked="{td.completed}"
              on:input="{ (e) => setTodoItemCompleted(idx, tdidx, e.target.checked) }" />
          <div>{@html td.emoji || ''}</div>
          <div
              class="todo-text"
              on:click="{ () =>  updateTodoItemName(idx, tdidx) }">
              { crop(td.value) }
          </div>
          <div
              style="width: 18px; height: 18px"
              class="trash-icn"
              on:click="{ () => removeTodoItem(idx, tdidx) }"></div>
      </div>
      {/each}
  </div>
  <input
      style="height: 32px; border-radius: 5px; border-color: #656565; background: transparent !important; color: white"
      type="text"
      on:input="{ (e) => setTodoListNewValue(idx, e.target.value)}"
      id="{ 'todoinput' + idx }"
      on:keydown="{ e => { e.key == 'Enter' && addTodo(idx) } }"
      bind:value="{ todo.newValue }" />
</div>

<style>
  .todo-line {
    gap: 6px;
    padding: 4px;
    border-radius: 3px;
    display: flex;
    align-items: center;
  }
  .todo-line:hover {
    background-color: #88888855 !important;
  }
  .todo-text {
    font-size: 14px;
    font-weight: 200;
    flex: 1;
    overflow-wrap: anywhere
  }

  .trash-icn {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3'/%3E%3C/svg%3E");
    cursor: pointer;
  }
  .trash-icn:hover {
    background-color: #444;
  }
  .todo-check {
    margin: 0;
    flex-shrink: 0
  }

  .todo-card {
    gap: 9px;
    padding: 9px;
    border-radius: 7px;
    background-color: #1c1c1c;
    display: flex;
    box-shadow: 0px 0px 4px 0px #00000073;
    flex-direction: column;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 23px;
    font-weight: 300;
    overflow-wrap: anywhere;
  }

  .card-title-line {
    gap: 4px;
    font-size: 16px;
    font-weight: 100;
    display: flex;
  }

  .stat-item {
    padding: 5px;
    font-size: 16px;
  }

  .clear-btn {
    border: 1px solid;
    border-radius: 4px;
    border-color: #000000;
    background-color: #c75454;
    cursor: pointer;
  }

  .minimize-icon {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 32 32'%3E%3Cpath fill='white' d='M5 5v22h22V5zm2 2h18v18H7zm2 13v2h14v-2z'/%3E%3C/svg%3E");
    cursor: pointer
  }
  .minimize-icon:hover {
    background-color: #444;
  }
  * {box-sizing: border-box}
</style>
