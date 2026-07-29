import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { getFirebaseDb } from '@/lib/firebase/config'
import { db as localDb } from '@/lib/db/schema'
import type { JournalEntry } from '@/lib/db/schema'

const COLLECTION = 'journalEntries'

export function subscribeJournalEntries(userId: string, onData: (entries: JournalEntry[]) => void): Unsubscribe {
  const db = getFirebaseDb()!
  const q = query(
    collection(db, COLLECTION),
    where('userId', '==', userId),
    where('isDeleted', '==', false),
    orderBy('createdAt', 'desc')
  )

  return onSnapshot(q, (snap) => {
    const entries = snap.docs.map((d) => ({ id: d.id, ...d.data() } as JournalEntry))
    onData(entries)
    localDb.journalEntries.bulkPut(entries)
  })
}

export async function createJournalEntry(
  userId: string,
  data: Omit<JournalEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'isDeleted'>
) {
  const db = getFirebaseDb()!
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    userId,
    isDeleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateJournalEntry(id: string, data: Partial<JournalEntry>) {
  const db = getFirebaseDb()!
  await updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteJournalEntry(id: string) {
  const db = getFirebaseDb()!
  await updateDoc(doc(db, COLLECTION, id), { isDeleted: true, updatedAt: serverTimestamp() })
}
