import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className = '', ...props }: CardProps) {
  return <div className={`rounded-xl border border-border bg-card text-card-foreground shadow-sm p-4 ${className}`} {...props} />
}

export function CardHeader({ className = '', ...props }: CardProps) {
  return <div className={`mb-3 ${className}`} {...props} />
}

export function CardContent({ className = '', ...props }: CardProps) {
  return <div className={className} {...props} />
}
