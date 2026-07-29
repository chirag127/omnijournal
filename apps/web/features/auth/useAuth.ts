'use client'
import { useAuthStore } from '@/stores/auth.store'
import { getFirebaseAuth } from '@/lib/firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { user, loading } = useAuthStore()
  const router = useRouter()

  async function logout() {
    const auth = getFirebaseAuth()
    if (auth) await signOut(auth)
    router.push('/login')
  }

  return { user, loading, logout, isAuthenticated: !!user }
}
