export interface UnicellInfo {
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
  floatDuration?: number
}

export const unicellInfo: UnicellInfo[] = [
  {
    id: 1,
    scientific_name: "Escherichia coli",
    origin: {
      min: 3450000000,
      max: 3500000000
    },
    features: [
      { feature_item: "A unicellular, Gram-negative, rod-shaped (bacillus) bacterium." },
      { feature_item: "It moves by means of the many whip-like appendages called flagella that project in all directions from its cell body." },
      { feature_item: "It is a facultative anaerobe, meaning it can grow in both the presence and absence of oxygen." }
    ],
    image: "/Initial Assets/unicell_1.png",
    position: { x: '52.5%', y: '25%' },
    size: 60,
    floatDuration: 2.5
  }, 

  {
    id: 2,
    scientific_name: "Chlamydomonas",
    origin: {
      min: 1600000000,
      max: 2100000000
    },
    features: [
      { feature_item: "It is a unicellular eukaryote with a rigid cell wall made of glycoproteins." },
      { feature_item: "It is primarily photoautotrophic (produces its own food using sunlight via photosynthesis) but can also grow in the dark (heterotrophically) if provided with an organic carbon source like acetate." },
    ],
    image: "/Initial Assets/unicell_2.png",
    position: { x: '70%', y: '45%' },
    size: 40,
    floatDuration: 2.2
  },

  {
    id: 3,
    scientific_name: "Euglena",
    origin: {
      min: 1600000000,
      max: 2100000000
    },
    features: [
      { feature_item: "It can be both an autotroph (performing photosynthesis like a plant using its chloroplasts when light is available) and a heterotroph (consuming organic matter in the dark or from its environment)." },
      { feature_item: "A light-sensitive red eyespot (stigma) helps the organism detect light sources, allowing it to move towards light for photosynthesis (phototaxis)." }
    ],
    image: "/Initial Assets/unicell_3.png",
    position: { x: '85%', y: '20%' },
    size: 50,
    floatDuration: 2.8
  },

  {
    id: 4,
    scientific_name: "Bacterium",
    origin: {
      min: 3400000000,
      max: 3800000000
    },
    features: [
      { feature_item: "It is a unicellular prokaryote, meaning it lacks a membrane-bound nucleus and other complex organelles." },
      { feature_item: "It is motile, using the cluster of flagella located at one end to propel itself through its environment." },
      { feature_item: "It reproduces asexually through binary fission, where one cell divides into two identical daughter cells." }
    ],
    image: "/Initial Assets/unicell_4.png",
    position: { x: '50%', y: '75%' },
    size: 50,
    floatDuration: 3.0
  },

  {
    id: 5,
    scientific_name: "Paramecium",
    origin: {
      min: 1600000000,
      max: 2100000000
    },
    features: [
      { feature_item: "It is covered in short, hair-like structures called cilia which beat rhythmically like oars to allow the organism to move rapidly through water." },
      { feature_item: "It can use trichocysts, small sacs embedded in the outer cytoplasm (pellicle), for defense or anchorage." },
    ],
    image: "/Initial Assets/unicell_5.png",
    position: { x: '85%', y: '70%' },
    size: 45,
    floatDuration: 2.0
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