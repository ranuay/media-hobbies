interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  }

  return (
    <div className="flex justify-center items-center p-8">
      <div
        className={`${sizeClasses[size]} border-4 border-netflix-red border-t-transparent rounded-full animate-spin`}
      />
    </div>
  )
}
