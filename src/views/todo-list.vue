<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 py-5">
        <h1>{{ listName }}</h1>
      </div>
    </div>
    <div class="row mb-3">
      <form class="col-lg-6" @submit.prevent="handelAdd()">
        <input
          v-model="todoObj.description"
          type="text"
          class="form-control"
          placeholder="Create a new to-do..."
        />
      </form>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6">
        <ul class="list-group">
          <todo
            v-for="(item, index) in todoObj.todosList"
            :key="index"
            :description="item.description"
            :completed="item.completed"
            @on-toggle="handelToggle(item)"
            @on-delete="handelDelete(item)"
            @on-edit="handelEdit(item, $event)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Todo from "../components/todo-item.vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { AnyArray, AnyObject, listData } from "../type";

export default defineComponent({
  props: {
    listName: String,
  },
  components: { Todo },

  setup(props) {
    let todoObj: listData = reactive({
      todosList: [],
      description: "",
    });

    const handelAdd = (): void => {
      let { description } = todoObj;
      todoObj.todosList.push({ description, completed: true });
    };

    const handelToggle = (todo: AnyObject): void => {
      todo.completed = !todo.completed;
    };

    const handelDelete = (deletedTodo: AnyObject): void => {
      todoObj.todosList = todoObj.todosList.filter(
        (item: AnyObject) => item !== deletedTodo
      );
    };

    const handelEdit = (todo: AnyObject, newTodoDescription: string): void => {
      todo.description = newTodoDescription;
    };

    return {
      todoObj,
      handelAdd,
      handelToggle,
      handelDelete,
      handelEdit,
    };
  },
});
</script>

<style scoped></style>
