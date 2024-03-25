<script lang="ts">

  import { cancel, ok, input, setColor, setEmoji, prompt, type PromptModal } from './prompt.js'

  const colors = ['#da5204','#a22222','#742880','#007a9f','#23367a','#1e6123','#6b6b6b'];
  const emojis = ['👍','👎','⛔️','✅','❓','❗','❌','⭐️','🙂','😕','🎗️','🧩','🦠','👀','⏰','☀️','🌧️','▶️','⏸️','⏹️','❤️','☕️','⏳','📝','👮','🧠','💩'];
</script>

{#if $prompt?.visible}
<div
  on:click="{cancel}"
  style="
  position: fixed; 
  top:0; left:0; 
  width: 100%; height:100%; 
  background-color: rgba(255,255,255,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
">
  <div
      style="position: relative; padding: 11px; border-radius: 8px; background-color: #333333; box-shadow: 0px 0px 27px 0px #000000ff; resize: both; flex-direction: column; flex-wrap: wrap; gap: 5px; display: flex"
      on:click|stopPropagation="{() => {}}">
      <div class="prompt-title-wrap">
          <div>{@html $prompt.value.emoji || ''}</div>
          <div style="flex: 1">{$prompt.title}</div>
          <div
              style="width: 26px; height: 26px"
              class="close-cross"
              on:click="{cancel}"></div>
      </div>
      <div class="prompt-input-wrap">
          <textarea
              style="background-color: {$prompt.value.color == undefined ? 'inherit' : $prompt.value.color}"
              class="text-input"
              on:input="{(e) => input(e.target.value)}"
              on:keydown="{(e) => { (e.key == 'Enter' && e.metaKey) && ok()}}"
              on:keydown="{(e) => {e.key == 'Escape' && cancel()}}"
              id="promptInput"
              bind:value="{ $prompt.value.text }"></textarea>
          <div
              style="width: 116px; flex-direction: column; gap: 4px; display: flex">
              <button
                  style="height: 47px"
                  class="prompt-btn"
                  type="button"
                  on:click="{ok}">
                  {$prompt.button}
              </button>
              <div
                  style="padding: 4px; align-items: flex-start; flex-wrap: wrap; align-content: flex-start; gap: 4px; display: flex">
                  <div
                      style="width: 24px; height: 24px; border: 1px solid; border-color: #525252; background-color: #2b2b2b"
                      class="todo-color"
                      on:click="{ () => setColor() }">
                      X
                  </div>
                  {#each colors as color}
                  <div
                      style="width: 24px; height: 24px; background-color: {color}"
                      class="todo-color"
                      on:click="{ () => setColor(color) }"></div>
                  {/each}
              </div>
              <div
                  style="padding: 4px; align-items: flex-start; flex-wrap: wrap; align-content: flex-start; gap: 4px; flex: 1; display: flex">
                  <div
                      style="width: 24px; height: 24px"
                      class="todo-emoji-pick"
                      on:click="{ () => setEmoji() }">
                      X
                  </div>
                  {#each emojis as emoji}
                  <div
                      style="width: 24px; height: 24px; background-color: #2b2b2b"
                      class="todo-emoji-pick"
                      on:click="{ () => setEmoji(emoji) }">
                      {emoji}
                  </div>
                  {/each}
              </div>
          </div>
      </div>
  </div>
</div>
{/if}

<style>
  .text-input {
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex: 1;
    resize: both;
  }

  .close-cross {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z'/%3E%3C/svg%3E");
    cursor: pointer;
  }

  .prompt-title-wrap {
    align-items: center;
    gap: 6px;
    display: flex;
  }

  .prompt-input-wrap {
    justify-content: center;
    gap: 10px;
    display: flex;
  }

  .prompt-btn {
    border-radius: 7px;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .todo-color {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
  }

  .todo-emoji-pick {
    border: 1px solid;
    border-color: #525252;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
  }

  * {box-sizing: border-box}
</style>
