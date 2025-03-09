import PublicLayout from "@/shared/layouts/public/PublicLayout.vue";
import LandingView from "@/views/public/LandingView.vue";

const publicRoutes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      {
        path: "/",
        name: "landing",
        component: LandingView
      },
    ]
  },
]

export default publicRoutes
