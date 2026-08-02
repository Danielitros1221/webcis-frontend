// Banners preestablecidos para el picker de Mi Perfil (Historia 5). No hay
// endpoint de banner en el backend, así que se reutilizan fotos ya
// bundleadas para Home en vez de subir assets nuevos del proyecto de
// diseño; elegir uno solo persiste para la sesión (ver ProfileView.vue).
import comunidad from '@/assets/images/home/hero-itver.jpg'
import academicas from '@/assets/images/home/carrucel/obj-2.jpeg'
import proyectos from '@/assets/images/home/carrucel/obj-4.jpeg'

export const BANNER_OPTIONS = [
  { src: comunidad, label: 'Comunidad WebCIS' },
  { src: academicas, label: 'Actividades académicas' },
  { src: proyectos, label: 'Proyectos y exposiciones' },
]
