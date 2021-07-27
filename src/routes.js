import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tarefas",
      name: "tarefas",
      component: () => import("./components/TarefasList")
    },
    {
      path: "/tarefas/:id",
      name: "tarefas-details",
      component: () => import("./components/Tarefa")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTarefa")
    }
  ]
});