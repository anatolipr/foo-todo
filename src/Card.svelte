<script lang="ts">
  import { type TodoList } from "./todo/todoTypes";
  export let todo: TodoList;
  export let idx: number;


  import { addTodo, removeTodoItem, clearTodoItems,
  setTodoListNewValue, removeTodoList, setTodoItemCompleted,
  updateTodoItemName, updateTodoListName } from './todo/todoStore.js';
</script>

<div style="width: 271px; height: 376px" class="todo-card">
  <div class="card-title-line">
      <div class="card-title" on:click="{ () => updateTodoListName(idx) }">
          { todo.name }
      </div>
      <div
          style="width: 25px; height: 25px"
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
      <div class="todo-line">
          <input
              style="width: 24px; height: 24px"
              class="todo-check"
              type="checkbox"
              bind:checked="{td.completed}"
              on:input="{ (e) => setTodoItemCompleted(idx, tdidx, e.target.checked) }" />
          <div
              class="todo-text"
              on:click="{ () =>  updateTodoItemName(idx, tdidx) }">
              { td.value }
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
    flex: 1
  }

  .card-title-line {
    gap: 1px;
    font-size: 16px;
    font-weight: 100;
    display: flex;
  }

  .stat-item {
    padding: 5px;
    font-size: 16px;
  }

  .clear-btn {
    ;
    border-radius: 4px;
    background-color: #c75454;
    cursor: pointer
  }

  * {box-sizing: border-box}
</style>
