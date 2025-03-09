<script setup lang="ts">
import Library from "@/shared/assets/library.jpg"
import Footer from "@/shared/layouts/Footer.vue";
</script>

<template>
  <!-- Sección Hero -->
  <v-parallax
    :src="Library"
    :style="{ height: 'calc(100vh - 64px)', position: 'relative' }"
  >
    <div
      class="overlay"
      :style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)' }"
    ></div>

    <div
      :style="{zIndex: 2}"
      class="fill-height d-flex flex-column align-center justify-center text-white position-relative"
    >
      <h1 class="display-2 text-h3 font-weight-bold mb-4">Bienvenido a la Biblioteca
        Vortex</h1>
      <p class="text-h6 text-center mb-4 font-weight-bold">Accede a una amplia colección de recursos
        académicos y literarios.</p>
      <v-btn
        color="blue-darken-1"
        :to="{name: 'app-books'}"
        variant="elevated"
        size="large"
        class="text-subtitle-1 font-weight-black"
      >
        Explora Nuestro Catálogo
      </v-btn>
    </div>
  </v-parallax>

  <!-- Sección de Características -->
  <v-container class="mt-15 mb-15">
    <h2 class="text-h4 font-weight-bold text-center mb-10">Nuestras caracteristicas</h2>

    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="4"
        class="text-center"
      >
        <v-icon
          color="primary"
          size="64"
        >
          mdi-book-open-page-variant
        </v-icon>
        <h3 class="headline font-weight-bold mt-4">Extensa Colección</h3>
        <p class="body-1">Disponemos de una amplia variedad de libros y recursos académicos para
          apoyar tu aprendizaje.</p>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="text-center"
      >
        <v-icon
          color="primary"
          size="64"
        >
          mdi-laptop
        </v-icon>
        <h3 class="headline font-weight-bold mt-4">Acceso Digital</h3>
        <p class="body-1">Consulta y reserva libros en línea desde cualquier dispositivo, en
          cualquier momento.</p>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="text-center"
      >
        <v-icon
          color="primary"
          size="64"
        >
          mdi-account-group
        </v-icon>
        <h3 class="headline font-weight-bold mt-4">Soporte Dedicado</h3>
        <p class="body-1">Nuestro equipo está disponible para brindarte asistencia personalizada en
          tus consultas.</p>
      </v-col>
    </v-row>
  </v-container>

  <!-- Sección de Testimonios -->
  <v-container class="mt-15">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="8"
        class="text-center"
      >
        <h2 class="text-h4 font-weight-bold mb-6 mt-6">Lo que dicen nuestros estudiantes</h2>
        <v-carousel
          hide-delimiters
          height="180"
        >
          <v-carousel-item
          >
            <v-card
              class="py-6 px-16 "
              elevation="2"
              border
            >
              <v-card-text class="text-left">
                <p class="text-body-1 font-italic mb-4">"El personal de la biblioteca siempre está
                  dispuesto a ayudar. Su apoyo ha sido invaluable en mis investigaciones."</p>
                <p class="caption font-weight-bold text-right">- María López, Estudiante de Ciencias
                  Sociales</p>
              </v-card-text>
            </v-card>
          </v-carousel-item>
          <v-carousel-item>
            <v-card
              class="py-6 px-16 "
              elevation="2"
              border>
              <v-card-text class="text-left">
                <p class="text-body-1 font-italic mb-4">"El personal de la biblioteca siempre está
                  dispuesto a ayudar. Su apoyo ha sido invaluable en mis investigaciones."</p>
                <p class="caption font-weight-bold text-right">- María López, Estudiante de Ciencias
                  Sociales</p>
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>

  <!-- Sección de Llamada a la Acción (CTA) -->
  <v-container class=" text-center mb-15">
    <v-card
      class="pa-12"
      elevation="4"
    >
      <v-card-title class="justify-center">
        <h2 class=" font-weight-bold">📖 Únete a Nuestra Comunidad de Lectores 📖</h2>
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">Regístrate hoy y comienza a disfrutar de todos los beneficios que
          nuestra biblioteca universitaria tiene para ofrecerte.</p>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          color="blue-darken-1"
          class="text-subtitle-1 font-weight-bold"
          variant="flat"
          :to="{name: 'register'}"
        >
          Regístrate Ahora
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <Footer/>
</template>
