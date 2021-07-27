<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Adicionar Tarefa</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="tarefa.title"
          :rules="[(v) => !!v || 'Tarefa e requerida']"
          label="Titulo"
          required
        ></v-text-field>

        <v-text-field
          v-model="tarefa.description"
          :rules="[(v) => !!v || 'Descrição e requerida']"
          label="Descrição"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveTarefa">Enviar</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Tutorial.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newTarefa">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import TarefaDataService from "../services/TarefaDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tarefa: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveTarefa() {
      var data = {
        title: this.tarefa.title,
        description: this.tarefa.description,
      };

      TarefaDataService.create(data)
        .then((response) => {
          this.tarefa.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTarefa() {
      this.submitted = false;
      this.tarefa = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>