<template>
  <div>
    <h4 style="color:black">{{ card_title }}</h4>
    <form>
      <input v-model="title" placeholder="edit me" />
      <textarea v-model="description" placeholder="edit me" />
    </form>
  </div>
</template>

<script>
  export default {
    name: 'EditCard',
    props: ['title', 'description', 'id', 'column_id'],
    data() {
      return {
        card_title: ""
      }
    },
    mounted() {
      this.card_title = this.title === undefined ? "Add New Card" : "Edit Card";
    }
  }
</script>