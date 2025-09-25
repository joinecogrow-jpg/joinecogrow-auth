import React from 'react'

export default function TreesPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8">🌳 Tree Tracking System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-400">
          <h2 className="text-2xl font-bold mb-4">🌱 Plant a Tree</h2>
          <p className="text-gray-600 mb-4">Start your journey to a greener planet</p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
            Plant Now
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-400">
          <h2 className="text-2xl font-bold mb-4">📊 Track Growth</h2>
          <p className="text-gray-600 mb-4">Monitor your trees in real-time</p>
          <div className="text-3xl font-bold text-green-600">0 Trees</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-yellow-400">
          <h2 className="text-2xl font-bold mb-4">🏆 Earn NFTs</h2>
          <p className="text-gray-600 mb-4">Get certificates for your impact</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">
            View Rewards
          </button>
        </div>
      </div>
    </div>
  )
}
