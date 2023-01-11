<template>
  <div>
    <div id="top">
      <div class="board-title">Kanban</div>
      <div class="buttons">
         <button class="btn btn--primary" @click="openColumnModal">+ Add Column</button>
          <button class="btn btn--dump" @click="dumpSql">{{ isDumping ? "Loading..." : "Sql Dump" }}</button>
      </div>
    </div>

    <div class="board-container">
      <div class="columns" v-if="columns.length > 0">
        <div class="columns__column" v-for="column in columns" :key="column.id">
          <div class="columns__column__title">
            <div>{{ column.title }}</div>
            <button class="close-btn" @click="deleteColumn(column.id)">❌</button>
          </div>
          <draggable class="columns__column__draggable" :list="column.cards" group="cards" @change="onChange" @end="onEnd" :id="column.id">
            <div class="card" @click="editCard(card)" v-for="card in column.cards" :key="card.id">
              {{ card.title }}
            </div>
          </draggable>
          <button @click="editCard({column_id: column.id})" class="columns__column__add-btn">+ Add a Card</button>
        </div>
      </div>
    </div>
    <add-column @created="columnCreated"></add-column>
    <edit-card @saved="fetchColumns" :card="dirtyCard"></edit-card>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import EditCard from "@/components/EditCard";
  import {CardService, ColumnService, SqlDumpService} from "@/services";
  import AddColumn from "@/components/AddColumn";

  export default {
    name: "Board",
    components: {AddColumn, EditCard, draggable},
    data() {
      return {
        columns: [],
        dirtyCard: {},
        isDumping: false,
        updated_item: {
          action: '',
          id: 0,
          newIndex: 0,
        }
      }
    },
    methods: {
      openColumnModal() {
        this.$modal.show('add-column-modal');
      },
      editCard(card) {
        this.dirtyCard = card;
        this.$modal.show('edit-card-modal');
      },
      onChange: function(evt) {
        if(evt.moved !== undefined) {
          this.updated_item.action = "move";
          this.updated_item.newIndex = evt.moved.newIndex;
          this.updated_item.id = evt.moved.element.id;
        } else if(evt.added !== undefined) {
          this.updated_item.action = "added";
          this.updated_item.newIndex = evt.added.newIndex;
          this.updated_item.id = evt.added.element.id;
        }
      },
      onEnd: function(evt) {
        if(this.updated_item.action === "move") {
          CardService.shift(this.updated_item.id, {new_position: this.updated_item.newIndex});
        } else {
          CardService.addToColumn(this.updated_item.id, {position: this.updated_item.newIndex, column_id: evt.to.id});
        }
      },
      async fetchColumns() {
        const { data } = await ColumnService.getAll();
        this.columns = data.columns;
      },
      async deleteColumn(id) {
        const response = await ColumnService.delete(id);
        
        if(response.success) {
          await this.fetchColumns();
        }
      },
      columnCreated(newColumn) {
        //reload the board columns
        this.fetchColumns();
        //open card creation modal
        this.editCard({column_id: newColumn.id})
      },
      async dumpSql() {
        this.isDumping = true;
        await SqlDumpService.dump();
        this.isDumping = false
      },
    },
    async mounted() {
      await this.fetchColumns()
    }
  }
</script>

<style scoped lang="scss">
  #top {
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 600px) {
      display: block;

      .buttons {
        display: flex;
        justify-content: space-between;
        .btn {
          margin-top: -20px;
          margin-bottom: 20px;
        }
      }
    }

    button {
      margin-top:10px
    }
  }
  .board-container {
    overflow-x: scroll;

    .columns {
      padding: 0;
      display: inline-flex;

      &__column {
        background-color:#3d3d3c;
        border-radius:7px;
        padding:10px 10px 40px 10px;
        width: 250px;
        margin-right: 20px;
        position: relative;

        &__draggable {
          height: 80%
        }

        &__add-btn {
          position: absolute;
          bottom: 5px;
          width: 92% !important;
        }

        &__title {
          color:#c2c2c0;
          font-weight: 600;
          font-size: 20px;
          margin: 10px 0 15px 15px;
          display: flex;
          justify-content: space-between;

          .close-btn {
            width: 30px;
            font-size: 10px;
            margin-top:-10px;
            opacity: .4;
          }
        }

        .card {
          background-color:$secondary-color;
          border-radius:7px;
          box-shadow: #222 0 2px 10px;
          padding:20px;
          cursor:pointer;
          margin-bottom:10px;
          color:#999;
        }

        button {
          background: transparent;
          border:none;
          font-size: 15px;
          color:$primary-color-light;
          padding:10px;
          width: 100%;
          border-radius: 2px;
          text-align: left;
          cursor:pointer;

          &:hover {
            background-color: #555;
            color:$primary-color
          }
        }
      }
    }
  }
  .board-title {
    color:$light-font;
    font-size: 40px;
    font-weight: 700;
    margin-bottom:30px
  }

  .btn--dump {
    margin-left:10px;
    background-color:#fff
  }
</style>