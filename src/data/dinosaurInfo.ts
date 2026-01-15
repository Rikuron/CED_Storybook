import { type DinosaurInfo } from '../components/scene5/DinosaurInfoBox'

export const dinosaurData: Record<'smaller' | 'bigger', DinosaurInfo> = {
  smaller: {
    name: "Velociraptor",
    scientificName: "Velociraptor mongoliensis",
    period: "Late Cretaceous (75-71 million years ago)",
    features: [
      "Small but fierce predator",
      "Had sharp, curved claws for hunting",
      "Covered in feathers like birds",
      "Hunted in packs for larger prey"
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