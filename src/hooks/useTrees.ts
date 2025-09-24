import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useTrees() {
  const [trees, setTrees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = async () => {
    setLoading(true)
    try {
      // Mock data for now - replace with Supabase query
      const mockTrees = [
        { id: 1, species: 'Oak', planted: '2024-01-15', status: 'growing' },
        { id: 2, species: 'Pine', planted: '2024-02-20', status: 'planted' }
      ]
      setTrees(mockTrees)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refetch()
  }, [])

  return { trees, loading, error, refetch }
}

