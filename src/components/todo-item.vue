<template>
  <li class="d-flex align-items-center list-group-item">
    <button
      class="btn border-0 flex-grow-1 text-left shadow-none"
      :class="{ completed }"
      @click="$emit('on-toggle')"
      v-if="!isEditing"
    >
      <span>{{ description }}</span>
    </button>
    <form v-else class="flex-grow-1" @submit.prevent="finishEditing()">
      <input
        type="text"
        class="form-control"
        v-model="newTodoDescription"
        @blur="finishEditing()"
      />
    </form>
    <button
      @click="startEditing()"
      class="btn btn-outline-primary border-0 ml-2"
    >
      <span class="fa fa-edit"></span>
    </button>
    <button @click="$emit('on-delete')" class="btn btn-outline-danger border-0">
      <span class="fa fa-trash"></span>
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
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
  setup(props) {
    let data: itemData = reactive({ newTodoDescription: "", isEditing: false });
    const startEditing = () => {
      if (data.isEditing) {
        finishEditing();
      } else {
        data.newTodoDescription = props.description;
        data.isEditing = true;
      }
    };
    const finishEditing = () => {
      data.isEditing = false;
      // this.$emit("on-edit", data.newTodoDescription);
    };
    return {
      ...data,
      startEditing,
      finishEditing,
    };
  },
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
