const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/home/Home.vue")
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/home/Home.vue")
  },
  {
    path: "/city/:id",
    name: "city",
    component: () => import("../pages/city/CityDetaile.vue")
  }
];

export default routes;
