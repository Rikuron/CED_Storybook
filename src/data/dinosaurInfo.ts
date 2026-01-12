import { type DinosaurInfo } from '../components/scene5/DinosaurInfoBox'

export const dinosaurData: Record<'smaller' | 'bigger', DinosaurInfo> = {
  smaller: {
    name: "Brachiosaurus Junior",
    scientificName: "Brachiosaurus altithorax",
    period: "Late Jurassic (154-150 million years ago)",
    features: [
      "Long neck for reaching treetops",
      "Herbivore that ate plants",
      "Could grow up to 85 feet long",
      "Lived in herds for protection"
    ]
  },
  bigger: {
    name: "Brachiosaurus",
    scientificName: "Brachiosaurus altithorax",
    period: "Late Jurassic (154-150 million years ago)",
    features: [
      "One of the tallest dinosaurs ever",
      "Weighed up to 80 tons",
      "Front legs longer than back legs",
      "Gentle giant herbivore"
    ]
  }
}