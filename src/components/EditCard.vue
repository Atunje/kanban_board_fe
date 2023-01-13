<template>
  <modal name="edit-card-modal" class="modal" :adaptive="true" height="auto">
    <div class="modal__title">
      <div>{{ isNew ? "Add New Card" : "Edit Card" }}</div>
      <button @click="$modal.hide('edit-card-modal')">❌</button>
    </div>
    <form @submit.prevent="onSubmit">

      <div class="modal__success_msg" v-if="success_msg!=''">{{ success_msg }}</div>

      <div class="modal__input-group">
        <label>Title</label>
        <input v-model="form.title" placeholder="New Card Title" required>
        <small class="modal__error_msg" v-if="errors.title != undefined">{{ errors.title[0] }}</small>
      </div>

      <div class="modal__input-group">
        <label>Description</label>
        <textarea v-model="form.description" required placeholder="Card Description" />
        <small class="modal__error_msg" v-if="errors.description != undefined">{{ errors.description[0] }}</small>
      </div>

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
        },
        errors:[],
        success_msg: ""
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

          this.success_msg = response.message;

          this.$emit('saved');

          if(this.isNew) {
            this.reset();
          } else {
            this.$modal.hide('edit-card-modal');
          }

        } else {
          this.errors = response.errors;
          this.success_msg = ''
        }

        this.isLoading = false;
      },
      initialize() {
        this.errors = [];
        this.success_msg = [];
      },
      reset() {
        this.form = {
          title: "",
          description: "",
          column_id: this.card.column_id,
        }
      }
    },
    watch: {
      card: {
        handler: function(newVal) {
          this.form = {...newVal};
          this.isNew = this.card.id === undefined;
          this.initialize();
        },
        deep: true
      },
    }
  }
</script>