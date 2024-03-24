import Foo from 'avos/src/foo-store/foo.js'
import { tick } from 'svelte'

export type PromptModal = {
    visible: boolean;
    value?: string;
    title?: string;
    button?: string;
}

export const prompt: Foo<PromptModal> = new Foo();

let resolve: (value: string | undefined) => void;

export async function doPrompt(title: string, value: string = '', button: string = "OK"): Promise<string | undefined> {
    
    prompt.set({
        visible: true, value, button, title
    })

    await tick()
    document.getElementById('promptInput')?.focus()

    return new Promise((_resolve, _reject) => {
        resolve = _resolve;
    });
}

export function cancel(): void {
    resolve(undefined);
    prompt.set({visible: false})
}

export function ok(): void {
    resolve(prompt.get()?.value);
    prompt.set({visible: false});
}

export function input(value: string): void {
    const p = prompt.get();
    p.value = value;
    prompt.set(p)
}