import { useState } from 'react'
import { X, IndianRupee, Loader2, CreditCard } from 'lucide-react'

const paymentModes = ['Cash', 'UPI', 'Card', 'Bank Transfer']

function CheckInModal({ booking, onClose, onConfirm }) {
  const totalAmount = Number(booking.totalAmount) || 0
  const alreadyPaid = Number(booking.paidAmount) || 0

  const [paidNow, setPaidNow] = useState(totalAmount - alreadyPaid)
  const [paymentMode, setPaymentMode] = useState('Cash')
  const [loading, setLoading] = useState(false)

  const newTotalPaid = alreadyPaid + Number(paidNow || 0)
  const dueAmount = Math.max(totalAmount - newTotalPaid, 0)
  const paymentStatus = dueAmount === 0 ? 'Paid' : newTotalPaid > 0 ? 'Partial' : 'Unpaid'

  const handleConfirm = async () => {
    setLoading(true)
    await onConfirm({
      paidAmount: newTotalPaid,
      dueAmount,
      paymentStatus,
      paymentMode,
    })
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <CreditCard size={22} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Check-in & Collect Payment</h2>
          <p className="text-sm text-gray-500 mt-1">{booking.guestName} — {booking.roomName}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold text-gray-800">₹{totalAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Already Paid</span>
            <span className="font-semibold text-gray-800">₹{alreadyPaid}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount Collecting Now</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5">
              <IndianRupee size={16} className="text-gray-400" />
              <input
                type="number"
                min="0"
                max={totalAmount - alreadyPaid}
                value={paidNow}
                onChange={(e) => setPaidNow(e.target.value)}
                className="w-full outline-none text-sm text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Payment Mode</label>
            <div className="grid grid-cols-2 gap-2">
              {paymentModes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPaymentMode(mode)}
                  className={`text-sm font-medium py-2.5 rounded-lg border transition-colors ${
                    paymentMode === mode
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Paid (after this)</span>
              <span className="font-semibold text-green-600">₹{newTotalPaid}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Remaining Due</span>
              <span className={`font-semibold ${dueAmount > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                ₹{dueAmount}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span className="text-gray-500">Payment Status</span>
              <span className="font-semibold text-gray-800">{paymentStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Confirm Check-in
          </button>
          <button
            onClick={onClose}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckInModal