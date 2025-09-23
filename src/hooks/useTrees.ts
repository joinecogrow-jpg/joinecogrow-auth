'use client'

import { useState, useEffect } from 'react'
import { TreeService, Tree } from '@/services/trees/treeService'

export function useTrees() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrees()
  }, [])

  const fetchTrees = async () => {
    try {
      setLoading(true)
      const data = await TreeService.fetchAllTrees()
      setTrees(data)
      setError(null)
    } catch (err) {
      setError('Failed to load trees')
    } finally {
      setLoading(false)
    }
  }

  return { trees, loading, error, refetch: fetchTrees }
}
