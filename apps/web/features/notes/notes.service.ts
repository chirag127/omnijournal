import {
  collection,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { getFirebaseDb } from '@/lib/firebase/config'
import { db as localDb } from '@/lib/db/schema'
import type { Note } from '@/lib/db/schema'

const COLLECTION = 'notes'

export function subscribeNotes(userId: string, onData: (notes: Note[]) => void): Unsubscribe {
  const db = getFirebaseDb()!
  const q = query(
    collection(db, COLLECTION),
    where('userId', '==', userId),
    where('isDeleted', '==', false),
    orderBy('updatedAt', 'desc')
  )

  return onSnapshot(q, (snap) => {
    const notes = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Note))
    onData(notes)
    localDb.notes.bulkPut(notes)
  })
}

export async function createNote(
  userId: string,
  data: Omit<Note, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'isDeleted'>
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

export async function updateNote(id: string, data: Partial<Note>) {
  const db = getFirebaseDb()!
  await updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteNote(id: string) {
  const db = getFirebaseDb()!
  await updateDoc(doc(db, COLLECTION, id), { isDeleted: true, updatedAt: serverTimestamp() })
}

export function extractWikilinks(content: string): string[] {
  const matches = content.matchAll(/\[\[([^\]]+)\]\]/g)
  return [...matches].map((m) => m[1])
}
