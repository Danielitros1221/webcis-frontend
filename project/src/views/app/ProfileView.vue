<script setup>
import { computed, ref } from 'vue'

import AboutCard from '@/components/app/profile/AboutCard.vue'
import AllMedalsModal from '@/components/app/profile/AllMedalsModal.vue'
import MedalsCard from '@/components/app/profile/MedalsCard.vue'
import { MOCK_BIO, MOCK_CONTROL_NUMBER, MOCK_MEDALS } from '@/components/app/profile/profile.mock'
import ProfileHeader from '@/components/app/profile/ProfileHeader.vue'
import ToastHost from '@/components/ui/ToastHost.vue'
import { useFeaturedMedals } from '@/composables/useFeaturedMedals'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'
import defaultBanner from '@/assets/images/home/hero-itver.jpg'
import { roleLabel as labelForRole } from '@/utils/roleLabels'
import { initialsFromName } from '@/utils/text'

const auth = useAuthStore()
const tab = ref('muro')

const fullName = computed(() => {
  const user = auth.user
  if (!user) return 'Usuario'
  return [user.name, user.surname, user.secondSurname].filter(Boolean).join(' ')
})
const roleLabel = computed(() => labelForRole(auth.role))
const initials = computed(() => initialsFromName(fullName.value))

const username = computed(() => auth.user?.username ?? null)
const { featuredIds, featuredMedals, saveFeatured } = useFeaturedMedals(username, MOCK_MEDALS)
const { notify } = useToast()
const medalsModalOpen = ref(false)

function handleSaveFeatured(ids) {
  saveFeatured(ids)
  medalsModalOpen.value = false
  notify('Selección de medallas actualizada.')
}
</script>

<template>
  <section>
    <ProfileHeader
      v-model:tab="tab"
      :banner-src="defaultBanner"
      :full-name="fullName"
      :username="auth.user?.username ?? ''"
      :role-label="roleLabel"
      :avatar-src="auth.user?.profile"
      :initials="initials"
    />

    <div class="mx-auto max-w-[900px] px-6 pb-10">
      <div v-if="tab === 'muro'" class="mt-5 flex flex-col gap-[18px]">
        <AboutCard
          :description="MOCK_BIO"
          :email="auth.user?.email"
          :control-number="MOCK_CONTROL_NUMBER"
          :role-label="roleLabel"
        />
        <MedalsCard
          :total-count="MOCK_MEDALS.length"
          :featured-medals="featuredMedals"
          @open-all="medalsModalOpen = true"
        />
      </div>

      <div v-else class="mt-5 flex flex-col gap-[18px]">
        <div class="rounded-(--radius-card) bg-white p-6 text-center shadow-(--shadow-card)">
          <p class="font-display text-[17px] font-bold text-negro-sintaxis">Editar perfil</p>
          <p class="mt-2 font-display text-sm text-[#666]">Próximamente.</p>
        </div>
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
