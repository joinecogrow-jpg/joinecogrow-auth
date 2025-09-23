import { supabase } from '@/lib/supabase'

export interface Tree {
  id: string
  user_email: string
  species: string
  planted_date: string
  photo_url: string | null
  status: string
  carbon_offset: number
  created_at: string
}

export class TreeService {
  static async fetchAllTrees(): Promise<Tree[]> {
    const { data, error } = await supabase
      .from('trees')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching trees:', error)
      return []
    }

    return data || []
  }

  static async plantTree(treeData: Partial<Tree>): Promise<Tree | null> {
    const { data, error } = await supabase
      .from('trees')
      .insert([treeData])
      .select()
      .single()

    if (error) {
      console.error('Error planting tree:', error)
      return null
    }

    return data
  }
}
