"use client";

export default function DeleteModal({
  isOpen,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  onClose,
  onConfirm,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md mx-4 rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">

        {/* Icon */}
        <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="text-slate-500 mt-2">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              py-3
              rounded-xl
              border
              border-slate-200
              font-medium
              hover:bg-slate-50
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              flex-1
              py-3
              rounded-xl
              bg-red-500
              text-white
              font-medium
              hover:bg-red-600
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}