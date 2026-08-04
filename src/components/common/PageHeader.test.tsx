import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PageHeader from './PageHeader'

describe('PageHeader', () => {
  it('should render the title', () => {
    render(<PageHeader title="Manga" />)
    expect(screen.getByRole('heading', { level: 1, name: 'Manga' })).toBeInTheDocument()
  })

  it('should render the description when provided', () => {
    render(<PageHeader title="Manga" description="Browse manga." />)
    expect(screen.getByText('Browse manga.')).toBeInTheDocument()
  })
})
