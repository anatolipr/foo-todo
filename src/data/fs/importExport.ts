import { $todo } from "../todo/todoStore";

import { readFile, saveFile } from 'avos/src/util.js'

export async function save() {
    const todoMain = $todo.get();
    saveFile(JSON.stringify(todoMain), (todoMain.name || 'untitled') + '.footodo')
}

export async function open() {
    //todo validate type
  const content: string = await readFile();
  if (content) {
    $todo.set(JSON.parse(content))
  }
}
