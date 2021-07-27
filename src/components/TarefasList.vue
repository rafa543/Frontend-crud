<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Tarefas</v-card-title>

        <v-data-table
          v-on:change="exibirAlerta"
          :headers="headers"
          :items="tutorials"
          :items-per-page= 5
        >
        
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template>

        </v-data-table>

        
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TarefaDataService from "../services/TarefaDataService";


export default {
  name: "tutorials-list",
  data() {
      return {
      
      tutorials: [],
      info:[],
      title: "",
      headers: [
        { text: "Titulo", align: "start", sortable: false, value: "title" },
        { text: "Descrição", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "DataCriacao", value: "dataCriacao", sortable: false },
        { text: "Ações", value: "actions", sortable: false }
      ],
      
    };
  },
  methods: {
    retrieveTutorials() {
      TarefaDataService.getAll()
        .then((response) => {
          this.tutorials = response.data.t.map(this.getDisplayTutorial);
          this.info = response.data
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    exibirAlerta(){
      alert('ola')
    },

    refreshList() {
      this.retrieveTutorials();
    },

    teste() {
      alert('teste')
    },

    searchTitle() {
      TarefaDataService.findByTitle(this.title)
        .then((response) => {
          this.tutorials = response.data.t.map(this.getDisplayTutorial);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editTutorial(id) {
      this.$router.push({ name: "tarefas-details", params: { id: id } });
    },

    deleteTutorial(id) {
      TarefaDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayTutorial(tutorial) {
      let date = new Date(tutorial.dataCriacao)
      let dataCriacao = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      let status
      if(tutorial.status === "ABERTA"){
        status = 'ABERTA';
      }else if(tutorial.status === "EM_ANDAMENTO"){
        status = 'EM ANDAMENTO';
      }else{
        status = 'CONCLUIDO';
      }

      return {
        id: tutorial.id,
        title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
        description: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
        status,
        dataCriacao
      };
    },
  },

  mounted() {
    this.retrieveTutorials();
  },
};
</script>

<style>
.list {
  max-width: 950px;
}
</style>