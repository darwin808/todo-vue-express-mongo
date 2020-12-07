import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import Todoapp from "../components/Todoapp";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Todoapp",
    component: Todoapp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
