import { describe, it, expect } from 'vitest'
import { resources } from '../data/resources'
import { topics } from '../data/topics'
import { credentials } from '../data/credentials'

const VALID_LEVELS = ['beginner', 'intermediate', 'advanced']
const VALID_FORMATS = ['course', 'article', 'video', 'lab', 'book', 'challenge']
const VALID_COSTS = ['free', 'freemium', 'paid']
const VALID_TYPES = [
  'professional-certification',
  'course-certificate',
  'statement',
  'digital-badge',
  'training-only',
]
const VALID_STATUSES = ['active', 'limited', 'unverified', 'closed']

describe('seed data validation', () => {
  it('should have at least 30 curated resources', () => {
    expect(resources.length).toBeGreaterThanOrEqual(30)
  })

  it('should have unique resource ids', () => {
    const ids = resources.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should have 10 roadmap topics in order 1..10', () => {
    expect(topics.length).toBe(10)
    const orders = [...topics].sort((a, b) => a.order - b.order).map((t) => t.order)
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('every resource should reference a valid topic and valid enums', () => {
    const topicIds = new Set(topics.map((t) => t.id))
    for (const r of resources) {
      expect(r.topicIds.length).toBeGreaterThan(0)
      for (const t of r.topicIds) {
        expect(topicIds.has(t), `resource ${r.id} references unknown topic ${t}`).toBe(true)
      }
      expect(VALID_LEVELS).toContain(r.level)
      expect(VALID_FORMATS).toContain(r.format)
      expect(VALID_COSTS).toContain(r.accessCost)
      expect(r.officialUrl).toMatch(/^https:\/\//)
    }
  })

  it('every topic should reference valid primary and alternative resources', () => {
    const resourceIds = new Set(resources.map((r) => r.id))
    for (const t of topics) {
      expect(t.primaryResourceIds.length).toBeGreaterThan(0)
      for (const id of [...t.primaryResourceIds, ...t.alternativeResourceIds]) {
        expect(resourceIds.has(id), `topic ${t.id} references unknown resource ${id}`).toBe(true)
      }
    }
  })

  it('topic prerequisites should reference earlier topics only', () => {
    const orderMap = new Map(topics.map((t) => [t.id, t.order]))
    for (const t of topics) {
      for (const prereq of t.prerequisites ?? []) {
        const prereqOrder = orderMap.get(prereq)
        expect(prereqOrder, `topic ${t.id} prereq ${prereq} not found`).toBeDefined()
        expect(
          prereqOrder! < t.order,
          `topic ${t.id} prereq ${prereq} must come earlier`
        ).toBe(true)
      }
    }
  })

  it('should have at least 5 credentials, 5 active, and 1 closed example', () => {
    expect(credentials.length).toBeGreaterThanOrEqual(6)
    const active = credentials.filter((c) => c.status === 'active')
    const closed = credentials.filter((c) => c.status === 'closed')
    expect(active.length).toBeGreaterThanOrEqual(5)
    expect(closed.length).toBeGreaterThanOrEqual(1)
  })

  it('every credential should have official link, verification date, and valid enums', () => {
    for (const c of credentials) {
      expect(c.officialUrl).toMatch(/^https:\/\//)
      expect(c.lastVerifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(VALID_TYPES).toContain(c.type)
      expect(VALID_STATUSES).toContain(c.status)
    }
  })

  it('free course must not claim free credential unless verified (label discipline)', () => {
    for (const c of credentials) {
      if (c.type === 'training-only') {
        expect(c.credentialFree).toBe(false)
      }
    }
  })

  it('closed credentials should not be marked as free', () => {
    for (const c of credentials.filter((x) => x.status === 'closed')) {
      expect(c.credentialFree).toBe(false)
      expect(c.courseFree).toBe(false)
    }
  })
})
