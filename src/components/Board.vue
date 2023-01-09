<template>
  <div>
    <div id="top">
      <div class="board-title">Kanban</div>
      <button class="primary-button">+ Add Column</button>
    </div>

    <div class="board-container">
      <div class="columns">
        <div class="column" v-for="column in columns" :key="column.id">
          <div class="column-title">{{ column.title }}</div>
          <draggable :list="column.cards" group="cards" @change="onChange" @end="onEnd" :id="column.id">
            <div class="card" @click="editCard(card)" v-for="card in column.cards" :key="card.id">
              {{ card.title }}
            </div>
          </draggable>
          <button @click="editCard({column_id: column.id})">+ Add a Card</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import EditCard from "@/components/EditCard";

  export default {
    name: "Board",
    components: {draggable},
    data() {
      return {
        columns: [
          {
            id: 1, title: "Academics", cards: [
              {id: 1, title: "Bachelors Degree", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 2, title: "Masters Degree", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 3, title: "Doctorate", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
            ]
          },
          {
            id: 2, title: "Professional", cards: [
              {id: 5, title: "AWS Certified Devops Engineer", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 6, title: "AWS Certified Solutions Architect", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 7, title: "Google Cloud Engineer", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 8, title: "Zend PHP Engineer", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
            ]
          },
          {
            id: 3, title: "Spiritual", cards: [
              {id: 9, title: "Salvation", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 10, title: "Sanctification", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 11, title: "Holy Ghost Baptism", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 12, title: "Gifts of the Spirit", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
              {id: 13, title: "Outreaches", description: "Lorennd dibkjs j dsdmn dsbiudsk dbjb jksd"},
            ]
          }
        ],
        updated_item: {
          action: '',
          elementId: 0,
          newIndex: 0,
          newColumn: 0
        }
      }
    },
    methods: {
      editCard(card) {
        this.$modal.show(EditCard, card)
      },
      onChange: function(evt) {
        if(evt.moved !== undefined) {
          this.updated_item.action = "move";
          this.updated_item.newIndex = evt.moved.newIndex;
          this.updated_item.elementId = evt.moved.element.id;
        } else if(evt.added !== undefined) {
          this.updated_item.action = "added";
          this.updated_item.newIndex = evt.added.newIndex;
          this.updated_item.elementId = evt.added.element.id;
        }
      },
      onEnd: function(evt) {
        this.updated_item.newColumn = evt.to.id;
        //this.moveCard();
      }
    }
  }
</script>

<style scoped lang="scss">
  #top {
    display: flex;
    justify-content: space-between;

    button {
      margin-top:10px
    }
  }
  .board-container {
    overflow-x: scroll;

    .columns {
      padding: 0;
      display: inline-flex;

      .column {
        background-color:#3d3d3c;
        border-radius:7px;
        padding:10px;
        width: 250px;
        margin-right: 20px;

        .column-title {
          color:#c2c2c0;
          font-weight: 600;
          font-size: 20px;
          margin: 10px 15px 15px 15px;
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
</style>