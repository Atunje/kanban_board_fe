<template>
  <modal name="edit-card-modal" class="modal" :adaptive="true" height="380">
    <div class="modal__title">
      <div>{{ isNew ? "Add New Card" : "Edit Card" }}</div>
      <button @click="$modal.hide('edit-card-modal')">❌</button>
    </div>
    <form @submit.prevent="onSubmit">
      <label>Title</label>
      <input v-model="form.title" placeholder="New Card Title" required>

      <label>Description</label>
      <textarea v-model="form.description" required placeholder="Card Description" />

      <button type="submit" class="btn btn--primary btn--modal"> {{ isLoading ? "Submitting" : "Submit" }}</button>
    </form>
  </modal>
</template>

<script>
import {CardService} from "@/services";

  export default {
    name: 'EditCard',
    props: ['card'],
    data() {
      return {
        form_title: "",
        isLoading: false,
        isNew: false,
        form: {
          title: "",
          description: "",
        }
      }
    },
    methods: {
      async onSubmit() {
        this.isLoading = true;

        let response;
        if(this.isNew) {
          response = await CardService.create(this.form);
        } else {
          response = await CardService.update(this.card.id, this.form)
        }

        if(response.success) {
          this.$emit('saved');
        }

        if(this.isNew) {
          this.form = {
            title: "",
            description: "",
            column_id: this.card.column_id,
          }
        } else {
          this.$modal.hide('edit-card-modal');
        }

        this.isLoading = false;
      },
    },
    watch: {
      card: {
        handler: function(newVal) {
          this.form = newVal;
          this.isNew = this.card.id === undefined;
        },
        deep: true
      },
    }
  }
</script>