<script setup>
import { ref } from 'vue'
import bgHome from '@/assets/images/home/background-home.png'
import studentPhoto from '@/assets/images/home/student.jpg'
import HomeHero from '@/components/public/home/HomeHero.vue'
import HomeSectionGrid from '@/components/public/home/HomeSectionGrid.vue'
import HomeMission from '@/components/public/home/HomeMission.vue'
import HomeGoals from '@/components/public/home/HomeGoals.vue'
import HomeCarousel from '@/components/public/home/HomeCarousel.vue'
import HomeCommunity from '@/components/public/home/HomeCommunity.vue'
import HomeModal from '@/components/public/home/HomeModal.vue'
import HomeToast from '@/components/public/home/HomeToast.vue'

import obj1 from '@/assets/images/home/carrucel/obj-1.jpeg'
import obj2 from '@/assets/images/home/carrucel/obj-2.jpeg'
import obj3 from '@/assets/images/home/carrucel/obj-3.jpeg'
import obj4 from '@/assets/images/home/carrucel/obj-4.jpeg'
import obj5 from '@/assets/images/home/carrucel/obj-5.jpeg'

const activeModal = ref(null)
const toastMsg = ref(null)

const objectives = [
  {
    num: '01',
    img: obj1,
    title: 'Bases de programación validadas por la academia',
    text: 'Mejorar las bases de programación de los alumnos a través de contenidos diseñados por estudiantes, profesores, egresados y personal externo especializado. Validados por los docentes de la academia de ISC.',
  },
  {
    num: '02',
    img: obj2,
    title: 'Investigación y aprendizaje autodidacta',
    text: 'Animar a los estudiantes a la investigación del conocimiento y al aprendizaje autodidacta.',
  },
  {
    num: '03',
    img: obj3,
    title: 'Más alumnos en tecnologías actuales',
    text: 'Aumentar el número de alumnos con conocimientos o interés en tecnologías actuales de la industria.',
  },
  {
    num: '04',
    img: obj4,
    title: 'Conocimiento y tendencias actualizadas',
    text: 'Actualizar la base de conocimientos de las generaciones actuales, promoviendo la enseñanza académica y las tendencias tecnológicas.',
  },
  {
    num: '05',
    img: obj5,
    title: 'Egresados listos para el sector productivo',
    text: 'Producir egresados con competencias actualizadas y pertinentes para el sector productivo.',
  },
]

const sergio = {
  name: 'Sergio Emanuel Soberano Paredes',
  role: 'Alumno · Creador de contenido',
  photo: studentPhoto,
  linkedin: 'https://www.linkedin.com/in/sergio-soberano/',
}
const students = [sergio, sergio, sergio, sergio]

function openModal(type) {
  activeModal.value = type
}

function closeModal() {
  activeModal.value = null
}
</script>

<template>
  <div
    class="min-h-screen bg-home-bg bg-cover bg-top bg-fixed font-display"
    :style="{ backgroundImage: `url(${bgHome})` }"
  >
    <HomeHero />

    <HomeSectionGrid @open-modal="openModal" />

    <div class="mx-auto max-w-[1460px] px-[clamp(16px,5vw,64px)] pb-[90px]">
      <div class="flex flex-wrap gap-7 mb-[84px]">
        <HomeMission />
        <HomeGoals />
      </div>

      <HomeCarousel :slides="objectives" />
    </div>

    <HomeCommunity :students="students" />

    <HomeModal :type="activeModal" @close="closeModal" />
    <HomeToast :message="toastMsg" />
  </div>
</template>
