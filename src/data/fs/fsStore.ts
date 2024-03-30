import Foo from "avos/src/foo-store/foo";
import type { File, FolderView } from "./fsTypes.js"


//This will typically live in a DB
export const $files: Foo<File[]> = new Foo([] as File[]);

export const $currentFolder: Foo<FolderView> = new Foo({
    files: <File[]>[]
})

//TODO - load from localstorage

export function openFolder(parent: string): void {
    //$files.get().filter
}