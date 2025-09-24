import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Tree {
  id: number
  species: string
  planted: string
  status: string
}

export function useTrees() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = async () => {
    setLoading(true)
    try {
      const mockTrees: Tree[] = [
        { id: 1, species: 'Oak', planted: '2024-01-15', status: 'growing' },
        { id: 2, species: 'Pine', planted: '2024-02-20', status: 'planted' }
      ]
      setTrees(mockTrees)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refetch()
  }, [])

  return { trees, loading, error, refetch }
}
