import { ReactNode } from 'react'

export interface StatisticsCardProps {
  title: string
  value?: number | string
  subtitle: string
  icon: ReactNode
}
