/**
 * a simple file type supporting two types: folder and file
 * can be used to represent a directory tree where each file has a parent
 * and the root directory has undefined as a parent
 */
export type File = {
    _id: string;
    parent?: string;
    type: 'folder' | 'file';
    name: string;
    createdTime: number;
    updatedTime: number;
    contentId: string;
}


/**
 * current folder representatoin for use by views
 * typically used with a function which retrieves a view based on parent - eg. Fruits
 */
export type FolderView {
    parent?: string;
    files: File[]
}




