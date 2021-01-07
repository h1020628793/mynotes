<template>
  <div class="todo-footer">



    <label>
      <!--<input type="checkbox" v-model="checkAll"/>-->
      <slot name="checkAll"></slot>
    </label>

    <span>
      <slot name="size"></slot>
     <!-- <span>已完成{{completeSize}} / 全部{{todos.length}}</span>-->
    </span>

    <slot name="delete"></slot>
   <!-- <button class="btn btn-danger" v-show="completeSize" @click="deleteAllCompleted">清除已完成任务</button>-->
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>