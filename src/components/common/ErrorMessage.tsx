interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
      <p className="text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-netflix-red text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  )
}
