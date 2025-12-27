export interface DialogueEntry {
  speaker: string
  lines: string[]
}

export interface SceneData {
  id: number
  name: string
  dialogue?: DialogueEntry[]
  background: string
}

export const storyScenes: SceneData[] = [
  {
    id: 1,
    name: 'Introduction',
    background: '/Initial Assets/space_bg.png',
  },

  {
    id: 2,
    name: 'Orbit',
    background: '/Initial Assets/space_bg.png',
    dialogue: [
      {
        speaker: 'Diego',
        lines: [
          "Whoa! What a beautiful planet!",
          "I wonder what it's like there...",
          "Let's take a closer look!"
        ]
      }
    ]
  },

  {
    id: 3,
    name: "AtmosphericEntry",
    background: '/Initial Assets/clouds.png',
  },

  {
    id: 4,
    name: "Volcanic",
    background: '/Initial Assets/prehistoric_bg.png',
    dialogue: [
      {
        speaker: 'Diego',
        lines: [
          "What the...!",
          "Are those... volcanoes and lightning?",
          "This must be ancient Earth!",
          "Let's explore deeper... maybe underwater?"
        ]
      }
    ]
  },

  {
    id: 5,
    name: "Dive",
    background: "/Initial Assets/sea.png",
    dialogue: [
      {
        speaker: "Diego",
        lines: [
          "The ocean! The birthplace of life itself.",
          "Let's dive in and see what we can find!",
        ]
      }
    ]
  },

  {
    id: 6,
    name: "Microscopic",
    background: "linear-gradient(to bottom, #0a4d68, #001d3d)",
    dialogue: [
      {
        speaker: "Diego",
        lines: [
          "Amazing! These are the first life forms!",
          "Click on them to learn more!",
        ]
      }
    ]
  }
]

export const microbeFacts = [
  {
    id: 1,
    name: "Cyanobacteria",
    fact: "These ancient bacteria produced oxygen and changed Earth's atmosphere forever!",
    color: "#4ade80",
  },
  {
    id: 2,
    name: "Archaean Cell",
    fact: "One of the oldest life forms, thriving in extreme conditions!",
    color: "#f59e0b",
  },
  {
    id: 3,
    name: "Eukaryote",
    fact: "The first cells with a nucleus - the ancestors of all complex life!",
    color: "#ec4899",
  },
  {
    id: 4,
    name: "Protocell",
    fact: "The very first self-replicating structures - the origin of life!",
    color: "#8b5cf6",
  },
]