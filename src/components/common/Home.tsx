export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[80vh] flex items-center justify-center bg-gradient-to-b from-black via-netflix-darkGray to-netflix-black">
        <div className="text-center z-10">
          <h1 className="text-6xl font-bold mb-4">Welcome to MediaFlix</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your personal library for manga, films, and books
          </p>
        </div>
      </div>
    </div>
  )
}
