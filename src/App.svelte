<script lang="ts">
  import Card from './Card.svelte';
  import Minimized from './Minimized.svelte';
  import Prompt from './components/prompt/Prompt.svelte'
  import { $todo as todo, addTodoList, renameTodoMain, newTodoMain, pasteTodoList, about } from './data/todo/todoStore.js';
  import { open, save } from './data/fs/importExport.js'
</script>
<div
  style="position: relative; overflow: hidden; max-width: 100vw; width: 100vw"
  class="todo-app">
  <div
      style="gap: 5px; padding: 2px; background-color: #000000; display: flex">
      <div style="font-size: 16px; flex: 1" on:click="{about}">Foo Todo</div>
      <div class="main-menu" on:click="{open}">Open</div>
      <div class="main-menu" on:click="{save}">Export</div>
      <div class="main-menu" on:click="{newTodoMain}">New</div>
  </div>
  <div class="file-name" on:click="{renameTodoMain}">
      {$todo.name || 'Unnamed'}
  </div>
  <div style="overflow: scroll" class="todo-ribbon" id="root">
      {#each $todo.todoLists as todoList, idx}
      <Card todo="{todoList}" idx="{idx}" />
      {/each}

      <div
          style="width: 46px; height: 46px"
          class="todo-plus-btn"
          on:click="{() => addTodoList('Unnamed', true)}"></div>
      <div
          style="width: 46px; height: 46px"
          class="paste-icon"
          on:click="{pasteTodoList}"></div>
  </div>
  <Minimized />
</div>
<Prompt />

<style>
  .todo-ribbon {
    gap: 18px;
    padding: 18px;
    border-radius: 2px;
    background-color: #333333;
    display: flex;
    width: 100%;
  }

  .todo-app {
    font-family: 'McLaren';
    box-shadow: 0px 0px 0px 0px #000000ff;
  }

  .todo-plus-btn {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cpath fill='white' d='M28 64a12 12 0 0 1 12-12h176a12 12 0 0 1 0 24H40a12 12 0 0 1-12-12m12 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m104 40H40a12 12 0 0 0 0 24h104a12 12 0 0 0 0-24m88 0h-12v-12a12 12 0 0 0-24 0v12h-12a12 12 0 0 0 0 24h12v12a12 12 0 0 0 24 0v-12h12a12 12 0 0 0 0-24'/%3E%3C/svg%3E");
    cursor: pointer
  }

  .file-name {
    font-size: 34px;
  }

  .main-menu {
    padding: 2px;
    cursor: pointer
  }
  .main-menu:hover {
    background-color: #3c3c3c;
  }
  .paste-icon {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1'/%3E%3Cpath d='M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2m-9 6h10'/%3E%3Cpath d='m17 10l4 4l-4 4'/%3E%3C/g%3E%3C/svg%3E");
    cursor: pointer
  }

  * {box-sizing: border-box}
</style>
