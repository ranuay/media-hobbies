import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PlaceholderPage from './PlaceholderPage'

describe('PlaceholderPage', () => {
  it('should render the title and coming soon message', () => {
    render(<PlaceholderPage title="Manga" />)
    expect(screen.getByRole('heading', { level: 1, name: 'Manga' })).toBeInTheDocument()
    expect(screen.getByText('Coming soon...')).toBeInTheDocument()
  })
})