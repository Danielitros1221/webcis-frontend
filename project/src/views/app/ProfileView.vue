<script setup>
import { computed, reactive, ref } from 'vue'

import AboutCard from '@/components/app/profile/AboutCard.vue'
import AllMedalsModal from '@/components/app/profile/AllMedalsModal.vue'
import EditProfileForm from '@/components/app/profile/EditProfileForm.vue'
import MedalsCard from '@/components/app/profile/MedalsCard.vue'
import { MOCK_ACTIVITY, MOCK_BIO, MOCK_CONTROL_NUMBER, MOCK_MEDALS } from '@/components/app/profile/profile.mock'
import ProfileHeader from '@/components/app/profile/ProfileHeader.vue'
import RecentActivityCard from '@/components/app/profile/RecentActivityCard.vue'
import ToastHost from '@/components/ui/ToastHost.vue'
import { useFeaturedMedals } from '@/composables/useFeaturedMedals'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'
import defaultBanner from '@/assets/images/home/hero-itver.jpg'
import { roleLabel as labelForRole } from '@/utils/roleLabels'
import { initialsFromName } from '@/utils/text'

const auth = useAuthStore()
const tab = ref('muro')

// Estado editable del perfil: arranca desde los datos reales de auth.user +
// los mocks de bio/número de control (ver profile.mock.js). Vive acá, y no
// en el store de auth, porque "Guardar cambios" solo persiste localmente
// (sin PATCH /profile en el backend todavía) — así, editar y volver al
// Muro muestra los cambios sin tocar la sesión real del usuario.
const profile = reactive({
  email: auth.user?.email ?? '',
  username: auth.user?.username ?? '',
  description: MOCK_BIO,
  names: auth.user?.name ?? '',
  surname: auth.user?.surname ?? '',
  secondSurname: auth.user?.secondSurname ?? '',
  controlNumber: MOCK_CONTROL_NUMBER,
})

const fullName = computed(() => {
  const name = [profile.names, profile.surname, profile.secondSurname].filter(Boolean).join(' ')
  return name || 'Usuario'
})
const roleLabel = computed(() => labelForRole(auth.role))
const initials = computed(() => initialsFromName(fullName.value))

const editInitialValues = computed(() => ({
  email: profile.email,
  username: profile.username,
  description: profile.description,
  names: profile.names,
  surname: profile.surname,
  second_surname: profile.secondSurname,
  control_number: profile.controlNumber,
}))

const username = computed(() => profile.username || null)
const { featuredIds, featuredMedals, saveFeatured } = useFeaturedMedals(username, MOCK_MEDALS)
const { notify } = useToast()
const medalsModalOpen = ref(false)

function handleSaveFeatured(ids) {
  saveFeatured(ids)
  medalsModalOpen.value = false
  notify('Selección de medallas actualizada.')
}

function handleSaveProfile(values) {
  profile.email = values.email
  profile.username = values.username
  profile.description = values.description ?? ''
  profile.names = values.names
  profile.surname = values.surname
  profile.secondSurname = values.second_surname ?? ''
  profile.controlNumber = values.control_number ?? ''

  // No hay endpoint de perfil en el backend todavía (BACKEND_ENDPOINTS.md
  // solo documenta auth y materials): el guardado queda solo en el estado
  // local de esta vista. Cuando exista PATCH /profile (o equivalente),
  // reemplazar esto por una llamada real vía un servicio dedicado, con su
  // manejo de error de servidor.
  // await updateProfile(values)

  tab.value = 'muro'
  notify('Perfil actualizado correctamente.')
}
</script>

<template>
  <section>
    <ProfileHeader
      v-model:tab="tab"
      :banner-src="defaultBanner"
      :full-name="fullName"
      :username="profile.username"
      :role-label="roleLabel"
      :avatar-src="auth.user?.profile"
      :initials="initials"
    />

    <div class="mx-auto max-w-[900px] px-6 pb-10">
      <div v-if="tab === 'muro'" class="mt-5 flex flex-col gap-[18px]">
        <AboutCard
          :description="profile.description"
          :email="profile.email"
          :control-number="profile.controlNumber"
          :role-label="roleLabel"
        />
        <MedalsCard
          :total-count="MOCK_MEDALS.length"
          :featured-medals="featuredMedals"
          @open-all="medalsModalOpen = true"
        />
        <RecentActivityCard :full-name="fullName" :activities="MOCK_ACTIVITY" />
      </div>

      <div v-else class="mt-5">
        <EditProfileForm
          :initial-values="editInitialValues"
          :role-label="roleLabel"
          @submit="handleSaveProfile"
          @cancel="tab = 'muro'"
        />
      </div>
    </div>

    <AllMedalsModal
      :open="medalsModalOpen"
      :all-medals="MOCK_MEDALS"
      :featured-ids="featuredIds"
      @close="medalsModalOpen = false"
      @save="handleSaveFeatured"
    />
    <ToastHost />
  </section>
</template>
