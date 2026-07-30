import {
  collection, addDoc, getDocs, getDoc, doc,
  updateDoc, deleteDoc, query, where, serverTimestamp
} from "firebase/firestore"
import { db } from "./config"

const roomsRef = collection(db, "rooms")

// Get all rooms (across all hotels)
export const getAllRooms = async () => {
  try {
    const snapshot = await getDocs(roomsRef)
    const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return { success: true, rooms }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get rooms for a specific hotel
export const getRoomsByHotel = async (hotelId) => {
  try {
    const q = query(roomsRef, where("hotelId", "==", hotelId))
    const snapshot = await getDocs(q)
    const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return { success: true, rooms }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get single room
export const getRoomById = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "rooms", id))
    if (docSnap.exists()) {
      return { success: true, room: { id: docSnap.id, ...docSnap.data() } }
    }
    return { success: false, error: "Room not found" }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Add new room
export const addRoom = async (roomData) => {
  try {
    const docRef = await addDoc(roomsRef, {
      ...roomData,
      createdAt: serverTimestamp(),
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update room
export const updateRoom = async (id, roomData) => {
  try {
    await updateDoc(doc(db, "rooms", id), roomData)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Delete room
export const deleteRoom = async (id) => {
  try {
    await deleteDoc(doc(db, "rooms", id))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}