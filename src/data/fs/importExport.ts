import { $todo } from "../todo/todoStore";

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



function saveFile(content: string, suggestedFileName: string = 'untitled.footodo', contentType: string = 'application/json') {
    var blob = new Blob([content], { type: contentType });

    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = suggestedFileName;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}


async function readFile(): Promise<string> {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = function() {
            const fileReader = new FileReader();

            fileReader.onload = function(event) {
                resolve(event.target!.result as string);
            };

            fileReader.onerror = function(error) {
                reject(error);
            };

            fileReader.readAsText((<HTMLInputElement>input).files![0]);
        };

        input.click();
    });
}