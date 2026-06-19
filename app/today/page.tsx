import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        <h1 className="text-6xl font-bold tracking-tight">Work Better</h1>
        <p className="text-2xl text-gray-600 max-w-md mx-auto">
          Intelligent daily workflow for high performers
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/today"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            Open Today →
          </Link>
          <Link
            href="/tasks"
            className="px-8 py-4 bg-white border border-gray-300 rounded-xl text-lg font-medium hover:bg-gray-50 transition"
          >
            Manage Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}
