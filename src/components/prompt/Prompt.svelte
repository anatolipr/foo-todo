<script lang="ts">

    import { cancel, ok, input, prompt, type PromptModal } from './prompt.js'
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
        style="position: relative; width: 359px; gap: 5px; padding: 6px; border-radius: 8px; background-color: #333333; display: flex; box-shadow: 0px 0px 27px 0px #000000ff; flex-direction: column"
        on:click|stopPropagation="{() => {}}">
        <div class="prompt-title-wrap">
            <div style="flex: 1">{$prompt.title}</div>
            <div
                style="width: 26px; height: 26px"
                class="close-cross"
                on:click="{cancel}"></div>
        </div>
        <div class="prompt-input-wrap">
            <input
                style="width: 208px; height: 47px"
                class="text-input"
                type="text"
                on:input="{(e) => input(e.target.value)}"
                on:keydown="{(e) => {e.key == 'Enter' && ok()}}"
                on:keydown="{(e) => {e.key == 'Escape' && cancel()}}"
                id="promptInput"
                :value="{$prompt}" />
            <button
                style="width: 105px; height: 47px"
                class="prompt-btn"
                type="button"
                on:click="{ok}">
                {$prompt.button}
            </button>
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
      background-color: black!important;
      color: white;
    }

    .close-cross {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z'/%3E%3C/svg%3E");
      cursor: pointer;
    }

    .prompt-title-wrap {
      display: flex;
      align-items: center
    }

    .prompt-input-wrap {
      justify-content: center;
      gap: 10px;
      display: flex;
      padding-bottom: 10px;
    }

    .prompt-btn {
      border-radius: 7px;
      background-color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white
    }

    * {box-sizing: border-box}
</style>
