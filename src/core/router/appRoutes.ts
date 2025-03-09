import AppLayout from "@/shared/layouts/app/AppLayout.vue";

const appRoutes = [
  {
    path: '/app',
    component: AppLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: "",
        name: "app-home",
        component: () => import("@/views/app/home/HomeView.vue")
      },
      {
        path: "books",
        name: "app-books",
        component: () => import("@/views/app/books/BooksView.vue")
      },
      {
        path: "categories",
        name: "app-categories",
        component: () => import("@/views/app/categories/CategoriesView.vue")
      }
    ]
  },
]

export default appRoutes
