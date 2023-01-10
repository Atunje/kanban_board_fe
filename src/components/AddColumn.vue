<template>
  <modal name="add-column-modal" class="modal" :adaptive="true" :width="500">
    <div class="modal__title">
      <div>Create New Column</div>
      <button @click="$modal.hide('add-column-modal')">❌</button>
    </div>
    <form @submit.prevent="onSubmit">
      <label>Column Title</label>
      <input v-model="title" placeholder="New Column Title" required>
      <button class="btn btn--primary btn--modal" type="submit"> {{ isLoading ? "Submitting" : "Submit" }}</button>
    </form>
  </modal>
</template>

<script>
import {ColumnService} from "@/services";

export default {
  name: "AddColumn",
  data() {
    return {
      title: "",
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;

      const response = await ColumnService.create({title: this.title});
      if(response.success) {
        this.title = "";
        this.$modal.hide('add-column-modal')
        this.$emit('created', response.data);
      }

      this.isLoading = false;
    }
  }
}
</script>

<style scoped>

</style>