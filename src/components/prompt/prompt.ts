import Foo from 'avos/src/foo-store/foo.js'
import { tick } from 'svelte'
import type { TodoListTextAndMeta } from '../../data/todo/todoTypes';

export type PromptModal = {
    visible: boolean;
    value: TodoListTextAndMeta;
    title?: string;
    button?: string;
}

export const prompt: Foo<PromptModal> = new Foo();

let resolve: (value: TodoListTextAndMeta | undefined) => void;

export async function doPrompt(title: string, value: TodoListTextAndMeta = {text:''}, button: string = "OK"): Promise<TodoListTextAndMeta | undefined> {
    
    prompt.set({
        visible: true, value, button, title
    })

    await tick()
    document.getElementById('promptInput')?.focus()

    return new Promise((_resolve, _reject) => {
        resolve = _resolve;
    });
}

function hide(): void {
    prompt.update(p => {p.visible = false; return p;});
}

export function cancel(): void {
    resolve(undefined);
    hide()
}

export function ok(): void {
    resolve(prompt.get()?.value);
    hide()
}

export function input(value: string): void {
    const p = prompt.get();
    p.value.text = value;
    prompt.set(p)
}

export function setColor(color: string): void {
    const p = prompt.get();
    p.value.color = color;
    prompt.set(p)
}

export function setEmoji(emoji: string): void {
    const p = prompt.get();
    p.value.emoji = emoji;
    prompt.set(p)
}