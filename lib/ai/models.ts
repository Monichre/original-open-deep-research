// Define your models here.

export interface Model {
  id: string
  label: string
  apiIdentifier: string
  description: string
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  },

  {
    id: 'o3-mini',
    label: 'o3 Mini',
    apiIdentifier: 'o3-mini',
    description: 'Powerful model for general tasks',
  },
  {
    id: 'o1',
    label: 'o1',
    apiIdentifier: 'o1',
    description: 'Fast and efficient for simpler tasks',
  },
  {
    id: 'o1-mini',
    label: 'o1 Mini',
    apiIdentifier: 'o1-mini',
    description: 'Fast and efficient for simpler tasks',
  },
  {
    id: 'deepseek-reasoner',
    label: 'DeepSeek Reasoner',
    apiIdentifier: 'deepseek-reasoner',
    description: 'For complex, multi-step tasks',
  }
] as const

export const DEFAULT_MODEL_NAME: string = 'gpt-4o'
