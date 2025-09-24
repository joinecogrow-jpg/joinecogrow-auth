'use client'

import React from 'react'
import { useTrees } from '@/hooks/useTrees'

export function TreeList() {
  const { trees, loading, error, refetch } = useTrees()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded">
        <p className="text-red-600">Error: {error}</p>
        <button onClick={refetch} className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {trees.map((tree) => (
        <div key={tree.id} className="p-4 border-2 border-green-400 rounded-lg">
          <div className="text-3xl mb-2">🌳</div>
          <h3 className="font-bold text-green-700">{tree.species}</h3>
          <p>Status: {tree.status}</p>
          <p>Carbon: {tree.carbon_offset} kg</p>
        </div>
      ))}
    </div>
  )
}
