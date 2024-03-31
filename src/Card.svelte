<script lang="ts">
  import { type TodoList } from "./data/todo/todoTypes";
  import { crop } from "./util.js";
  export let todo: TodoList;
  export let idx: number;


  import { addTodo, removeTodoItem, minimizeTodoList, clearTodoItems,
  setTodoListNewValue, removeTodoList, setTodoItemCompleted,
  updateTodoItemName, updateTodoListName, copyTodoList } from './data/todo/todoStore.js';
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
          class="copy-icon"
          on:click="{ () => copyTodoList(idx) }"></div>
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
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6'/%3E%3C/svg%3E");
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
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M12 2v8m4-4l-4 4l-4-4'/%3E%3Crect width='20' height='8' x='2' y='14' rx='2'/%3E%3Cpath d='M6 18h.01M10 18h.01'/%3E%3C/g%3E%3C/svg%3E");
    cursor: pointer;
  }
  .minimize-icon:hover {
    background-color: #444;
  }
  .copy-icon {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4m1 4H11'/%3E%3Cpath d='m15 10l-4 4l4 4'/%3E%3C/g%3E%3C/svg%3E");
    cursor: pointer
  }
  .copy-icon:hover {
    background-color: #444;
  }
  * {box-sizing: border-box}
</style>
