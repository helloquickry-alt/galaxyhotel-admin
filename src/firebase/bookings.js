import {
  collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query
} from "firebase/firestore"
import { db } from "./config"

const bookingsRef = collection(db, "bookings")

// Get all bookings (latest first)
export const getAllBookings = async () => {
  try {
    const q = query(bookingsRef, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    const bookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return { success: true, bookings }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update booking status
export const updateBookingStatus = async (id, status) => {
  try {
    await updateDoc(doc(db, "bookings", id), { status })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Delete booking
export const deleteBooking = async (id) => {
  try {
    await deleteDoc(doc(db, "bookings", id))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update payment info
export const updateBookingPayment = async (id, paidAmount, dueAmount, paymentStatus) => {
  try {
    await updateDoc(doc(db, "bookings", id), { paidAmount, dueAmount, paymentStatus })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Check-in with payment update (status + payment together)
export const checkInBooking = async (id, paymentData) => {
  try {
    await updateDoc(doc(db, "bookings", id), {
      status: 'Checked-in',
      paidAmount: paymentData.paidAmount,
      dueAmount: paymentData.dueAmount,
      paymentStatus: paymentData.paymentStatus,
      paymentMode: paymentData.paymentMode,
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}