export type Level = 'beginner' | 'intermediate' | 'advanced'

export type ResourceFormat = 'course' | 'article' | 'video' | 'lab' | 'book' | 'challenge'

export type AccessCost = 'free' | 'freemium' | 'paid'

export type TheoryPractice = 'theory' | 'practice' | 'mixed'

export interface Resource {
  id: string
  title: string
  provider: string
  officialUrl: string
  topicIds: string[]
  level: Level
  format: ResourceFormat
  accessCost: AccessCost
  languages: string[]
  estimatedMinutes?: number
  requiresAccount: boolean
  requiresLabOrVm: boolean
  theoryPractice: TheoryPractice
}

export type CredentialType =
  | 'professional-certification'
  | 'course-certificate'
  | 'statement'
  | 'digital-badge'
  | 'training-only'

export type CredentialStatus = 'active' | 'limited' | 'unverified' | 'closed'

export interface Credential {
  id: string
  resourceId?: string
  provider: string
  name: string
  officialUrl: string
  type: CredentialType
  status: CredentialStatus
  difficulty?: Level
  courseFree: boolean
  credentialFree: boolean
  examFree?: boolean
  costRange?: string
  examFormat?: string
  validityPeriod?: string
  renewalRequired?: boolean
  renewalPeriod?: string
  extraCosts?: string
  eligibility?: string
  whenUseful?: string
  evidenceNote: string
  lastVerifiedAt: string
}

export interface Specialization {
  id: string
  title: string
  role: string
  summary: string
  skills: string[]
  steps: string[]
  certs: {
    name: string
    provider: string
    costHint: string
    url: string
  }[]
  resources: {
    title: string
    provider: string
    url: string
  }[]
  timeToEntry: string
}

export interface RoadmapTopic {
  id: string
  order: number
  title: string
  learningGoals: string[]
  prerequisites?: string[]
  summary: string
  primaryResourceIds: string[]
  alternativeResourceIds: string[]
  practiceGuide?: string
  estimatedHours: number
  checklist: string[]
  nextSteps?: string
}

export type TopicStatus = 'not-started' | 'in-progress' | 'completed'

export interface ProgressState {
  completedResourceIds: string[]
  checkedChecklistIds: Record<string, string[]>
}
