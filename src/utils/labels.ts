import type {
  AccessCost,
  CredentialStatus,
  CredentialType,
  Level,
  ResourceFormat,
  RoadmapTopic,
  TheoryPractice,
  TopicStatus,
} from '../types'
import { topics } from '../data/topics'
import { resources } from '../data/resources'
import { credentials } from '../data/credentials'

export const LEVEL_LABELS: Record<Level, string> = {
  beginner: 'Pemula',
  intermediate: 'Menengah',
  advanced: 'Lanjutan',
}

export const FORMAT_LABELS: Record<ResourceFormat, string> = {
  course: 'Kursus',
  article: 'Artikel',
  video: 'Video',
  lab: 'Lab',
  book: 'Buku',
  challenge: 'Challenge',
}

export const COST_LABELS: Record<AccessCost, string> = {
  free: 'Gratis',
  freemium: 'Freemium',
  paid: 'Berbayar',
}

export const PRACTICE_LABELS: Record<TheoryPractice, string> = {
  theory: 'Teori',
  practice: 'Praktik',
  mixed: 'Teori + Praktik',
}

export const CREDENTIAL_TYPE_LABELS: Record<CredentialType, string> = {
  'professional-certification': 'Professional Certification',
  'course-certificate': 'Course Certificate',
  statement: 'Statement of Participation',
  'digital-badge': 'Digital Badge',
  'training-only': 'Training only',
}

export const CREDENTIAL_STATUS_LABELS: Record<CredentialStatus, string> = {
  active: 'Aktif',
  limited: 'Akses terbatas',
  unverified: 'Belum terverifikasi',
  closed: 'Ditutup',
}

export function getTopicStatus(topic: RoadmapTopic, completedResourceIds: string[]): TopicStatus {
  const completed = topic.primaryResourceIds.filter((id) => completedResourceIds.includes(id))
  if (completed.length === 0) return 'not-started'
  if (completed.length >= topic.primaryResourceIds.length) return 'completed'
  return 'in-progress'
}

export function getTopicProgress(
  topic: RoadmapTopic,
  completedResourceIds: string[]
): { done: number; total: number } {
  const total = topic.primaryResourceIds.length
  const done = topic.primaryResourceIds.filter((id) => completedResourceIds.includes(id)).length
  return { done, total }
}

export function getTopicById(id: string): RoadmapTopic | undefined {
  return topics.find((t) => t.id === id)
}

export function getTopicsInOrder(): RoadmapTopic[] {
  return [...topics].sort((a, b) => a.order - b.order)
}

export function getResourceById(id: string) {
  return resources.find((r) => r.id === id)
}

export function getCredentialById(id: string) {
  return credentials.find((c) => c.id === id)
}
