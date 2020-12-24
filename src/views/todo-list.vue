<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <h1>{{ listName }}</h1>
      </div>
    </div>
    <div class="row mb-3">
      <create-todo @on-new-todo="addTodo($event)" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo
            v-for="(todo, index) in todos"
            :key="index"
            :description="todo.description"
            :completed="todo.completed"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
            @on-edit="editTodo(todo, $event)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Todo from "../components/todo-item.vue";
import CreateTodo from "../components/creat-item.vue";
import { defineComponent, reactive } from "vue";
import { AnyArray, AnyObject } from "../type";
export default defineComponent({
  props: {
    listName: String,
  },
  components: { Todo, CreateTodo },

  setup(props) {
    let todos: AnyArray = reactive([]);
    const addTodo = (newTodo: string): void => {
      todos.push({ description: newTodo, completed: false });
    };
    const toggleTodo = (todo: AnyObject): void => {
      todo.completed = !todo.completed;
    };
    const deleteTodo = (deletedTodo: AnyObject): void => {
      todos = todos.filter((todo) => todo !== deletedTodo);
    };
    const editTodo = (todo: AnyObject, newTodoDescription: string): void => {
      todo.description = newTodoDescription;
    };
    return {
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
    };
  },
});
</script>

<style scoped></style>
