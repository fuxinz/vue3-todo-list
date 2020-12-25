<template>
  <li class="d-flex align-items-center list-group-item">
    <button
      class="btn border-0 flex-grow-1 text-left shadow-none"
      :class="{ completed }"
      @click="$emit('on-toggle')"
      v-show="!isEditing"
    >
      <span>{{ description }}</span>
    </button>
    <form v-show="isEditing" class="flex-grow-1" @submit.prevent="handelEdit()">
      <input
        type="text"
        class="form-control"
        v-model="newTodoDescription"
        @blur="handelEdit()"
        ref="inputElement"
      />
    </form>
    <button @click="startEdit()" class="btn btn-outline-primary border-0 ml-2">
      <span class="fa fa-edit"></span>
    </button>
    <button @click="handelDelete" class="btn btn-outline-danger border-0">
      <span class="fa fa-trash"></span>
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AnyArray, AnyObject } from "../type";
interface itemData {
  newTodoDescription: string;
  isEditing: Boolean;
}
export default defineComponent({
  props: {
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let newTodoDescription = ref("");
    let isEditing = ref(false);
    const inputElement: AnyObject = ref(null);

    const startEdit = () => {
      if (isEditing.value) {
        handelEdit();
      } else {
        isEditing = true;
        newTodoDescription.value = props.description;

        inputElement.focus();
      }
    };

    const handelEdit = () => {
      isEditing.value = false;
      context.emit("on-edit", newTodoDescription);
    };

    const handelDelete = () => {
      context.emit("on-delete");
    };

    return {
      newTodoDescription,
      isEditing,
      startEdit,
      handelEdit,
      handelDelete,
    };
  },
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
