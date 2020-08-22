import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/List/List.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "List",
    component: List,
  },
  {
    path: "/hero",
    name: "Hero",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import ( /* webpackChunkName: "about" */ "../views/Hero/Hero.vue"),
  },
  {
    path: "/region",
    name: "Region",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import ( /* webpackChunkName: "about" */ "../views/Region/Region.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;