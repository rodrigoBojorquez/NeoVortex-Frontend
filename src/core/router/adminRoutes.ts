import AdminLayout from "@/shared/layouts/admin/AdminLayout.vue";

const adminRoutes = [
  {
    path: "/admin",
    component: () => AdminLayout,
    meta: { requiresAuth: true, requiresAdminAccess: true },
    children: [
      {
        path: "panel",
        name: "admin-dashboard",
        component: () => import("@/views/admin/dashboard/DashboardView.vue")
      },
      {
        path: "books",
        name: "admin-books",
        component: () => import("@/views/admin/books/BooksView.vue")
      },
      {
        path: "books/:id/edit",
        name: "admin-books-edit",
        component: () => import("@/views/admin/books/BookForm.vue")
      },
      {
        path: "books/create",
        name: "admin-books-create",
        component: () => import("@/views/admin/books/BookForm.vue")
      },
      {
        path: "categories",
        name: "admin-categories",
        component: () => import("@/views/admin/categories/CategoriesView.vue")
      },
      {
        path: "categories/:id/edit",
        name: "admin-categories-edit",
        component: () => import("@/views/admin/categories/CategoryForm.vue")
      },
      {
        path: "categories/create",
        name: "admin-categories-create",
        component: () => import("@/views/admin/categories/CategoryForm.vue")
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("@/views/admin/users/UsersView.vue")
      },
      {
        path: "users/:id/edit",
        name: "admin-users-edit",
        component: () => import("@/views/admin/users/UserForm.vue")
      },
      {
        path: "users/create",
        name: "admin-users-create",
        component: () => import("@/views/admin/users/UserForm.vue")
      },
      {
        path: "roles",
        name: "admin-roles",
        component: () => import("@/views/admin/roles/RolesView.vue")
      },
      {
        path: "roles/:id/edit",
        name: "admin-roles-edit",
        component: () => import("@/views/admin/roles/RoleForm.vue")
      },
      {
        path: "roles/create",
        name: "admin-roles-create",
        component: () => import("@/views/admin/roles/RoleForm.vue")
      }
    ]
  }
]

export default adminRoutes
