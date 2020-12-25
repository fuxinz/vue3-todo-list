export declare type AnyArray = any[];

export declare type AnyObject = Record<string | symbol, any>;

export interface itemData {
  newTodoDescription: string;
  isEditing: Boolean;
}

export interface listData {
  todosList: AnyArray;
  description: String;
}
