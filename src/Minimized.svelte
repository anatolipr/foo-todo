<script lang="ts">
    import { restoreTodoList } from './data/todo/todoStore.js';
    import { crop } from "./util.js";
    import { $todo as todo } from './data/todo/todoStore.js';
</script>
{#if $todo.minimizedTodoLists.length > 0}
<div style="overflow: scroll" class="minimized-container">
    <div style="gap: 10px; display: flex">later</div>
    <div style="gap: 5px; display: flex">
        {#each $todo.minimizedTodoLists as todo, idx}
        <div
            style="background-color: {todo.color}"
            class="minimized-card"
            on:click="{ () => restoreTodoList(idx) }">
            <div>{@html todo.emoji || ''}</div>
            <div>{ crop(todo.name)} ({todo.todoItems.length})</div>
        </div>
        {/each}
    </div>
</div>
{/if}

<style>
    .minimized-card {
      gap: 5px;
      padding: 14px;
      display: flex;
      background-color: #1c1c1c;
      border-radius: 7px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .minimized-container {
      flex-direction: column;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 5px;
      display: flex
    }

    * {box-sizing: border-box}
</style>
