export interface MammalInfo {
  id: number
  scientific_name: string
  origin: {
    min: number
    max: number
  }
  features: {
    feature_item: string
  }[]
  image: string
  position: {
    x: string
    y: string
  }
  size: number
}

export const mammalData: MammalInfo[] = [
  {
    id: 1,
    scientific_name: "Josephoartigasia monesi",
    origin: {
      min: 2000000,
      max: 4000000
    },
    features: [
      { feature_item: "It was the size of a buffalo, making it the largest rodent ever discovered." },
      { feature_item: "It had continuously growing incisors up to 12 inches long." },
      { feature_item: "Its skull was heavily reinforced to withstand massive stress, suggesting its teeth could handle forces far exceeding normal biting." },
      { feature_item: "It was a herbivore that lived in forested or estuarine environments." }
    ],
    image: "/Initial Assets/11_Mammal.png",
    position: { x: '75%', y: '40%' },
    size: 200
  },
  {
    id: 2,
    scientific_name: "Josephoartigasia monesi",
    origin: {
      min: 2000000,
      max: 4000000
    },
    features: [
      { feature_item: "It was the size of a buffalo, making it the largest rodent ever discovered." },
      { feature_item: "It had continuously growing incisors up to 12 inches long." },
      { feature_item: "Its skull was heavily reinforced to withstand massive stress, suggesting its teeth could handle forces far exceeding normal biting." },
      { feature_item: "It was a herbivore that lived in forested or estuarine environments." }
    ],
    image: "/Initial Assets/11_Mammal.png",
    position: { x: '40%', y: '55%' },
    size: 230
  },
  {
    id: 3,
    scientific_name: "Josephoartigasia monesi",
    origin: {
      min: 2000000,
      max: 4000000
    },
    features: [
      { feature_item: "It was the size of a buffalo, making it the largest rodent ever discovered." },
      { feature_item: "It had continuously growing incisors up to 12 inches long." },
      { feature_item: "Its skull was heavily reinforced to withstand massive stress, suggesting its teeth could handle forces far exceeding normal biting." },
      { feature_item: "It was a herbivore that lived in forested or estuarine environments." }
    ],
    image: "/Initial Assets/11_Mammal.png",
    position: { x: '65%', y: '80%' },
    size: 180
  }
]

export const formatOrigin = (origin: {
  min: number
  max: number
}): string => {
  const getUnit = (num: number): {
    divisor: number
    label: string
  } => {
    if (num >= 1000000000) return {
      divisor: 1000000000, label: 'billion'
    }
    if (num >= 1000000) return {
      divisor: 1000000, label: 'million'
    }
    if (num >= 1000) return {
      divisor: 1000, label: 'thousand'
    }
    return {
      divisor: 1, label: ''
    }
  }

  const unit = getUnit(Math.max(origin.min, origin.max))
  const minFormatted = origin.min / unit.divisor
  const maxFormatted = origin.max / unit.divisor

  if (origin.min === origin.max) return `~${minFormatted} ${unit.label} years ago`

  return `${minFormatted} - ${maxFormatted} ${unit.label} years ago`
}