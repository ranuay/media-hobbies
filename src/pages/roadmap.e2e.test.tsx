import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import { ProgressProvider } from '../context/ProgressContext'
import { PROGRESS_STORAGE_KEY } from '../context/ProgressContext'
import RoadmapPage from './RoadmapPage'
import TopicDetailPage from './TopicDetailPage'

function renderWithProviders(ui: React.ReactElement, route = '/roadmap') {
  return render(
    <ProgressProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/topics/:topicId" element={<TopicDetailPage />} />
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </ProgressProvider>
  )
}

describe('roadmap to completion flow (e2e)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('roadmap shows 10 topics initially all "Belum mulai"', async () => {
    renderWithProviders(<RoadmapPage />)

    const notStarted = await screen.findAllByText('Belum mulai')
    expect(notStarted).toHaveLength(10)
  })

  it('marking all primary resources of topic 1 completes it and persists after reload', async () => {
    const user = userEvent.setup()

    const firstRender = renderWithProviders(<TopicDetailPage />, '/topics/computer-security-fundamentals')
    const completeButtons = await screen.findAllByRole('button', { name: /tandai selesai/i })
    expect(completeButtons.length).toBeGreaterThan(0)

    for (const btn of completeButtons) {
      await act(async () => {
        await user.click(btn)
      })
    }

    const saved = localStorage.getItem(PROGRESS_STORAGE_KEY)
    expect(saved).toBeTruthy()

    const completedButtons = await screen.findAllByRole('button', { name: /✓ selesai/i })
    expect(completedButtons.length).toBe(completeButtons.length)

    firstRender.unmount()

    // After "reload", roadmap should show topic 1 as completed
    renderWithProviders(<RoadmapPage />)
    await waitFor(() => {
      expect(screen.getByText('Computer & Security Fundamentals')).toBeInTheDocument()
    })
    expect(screen.getByText('Selesai')).toBeInTheDocument()
  })

  it('progress persists across mounts (localStorage)', async () => {
    localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        completedResourceIds: ['cisco-intro-cybersecurity', 'openlearn-intro-cyber-security'],
        checkedChecklistIds: {},
      })
    )

    renderWithProviders(<RoadmapPage />)

    await waitFor(() => {
      expect(screen.getByText('Selesai')).toBeInTheDocument()
    })
  })
})
