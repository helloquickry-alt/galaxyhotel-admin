import {
  collection, addDoc, getDocs, getDoc, doc,
  updateDoc, deleteDoc, serverTimestamp
} from "firebase/firestore"
import { db } from "./config"

const hotelsRef = collection(db, "hotels")

// Get all hotels
export const getAllHotels = async () => {
  try {
    const snapshot = await getDocs(hotelsRef)
    const hotels = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return { success: true, hotels }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get single hotel
export const getHotelById = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "hotels", id))
    if (docSnap.exists()) {
      return { success: true, hotel: { id: docSnap.id, ...docSnap.data() } }
    }
    return { success: false, error: "Hotel not found" }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Add new hotel
export const addHotel = async (hotelData) => {
  try {
    const docRef = await addDoc(hotelsRef, {
      ...hotelData,
      createdAt: serverTimestamp(),
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update hotel
export const updateHotel = async (id, hotelData) => {
  try {
    await updateDoc(doc(db, "hotels", id), hotelData)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Delete hotel
export const deleteHotel = async (id) => {
  try {
    await deleteDoc(doc(db, "hotels", id))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}