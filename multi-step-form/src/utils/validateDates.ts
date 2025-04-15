import { Experience } from '../types/form'

export const hasOverlappingDates = (experiences: Experience[]): boolean => {
  for (let i = 0; i < experiences.length; i++) {
    for (let j = i + 1; j < experiences.length; j++) {
      const exp1 = experiences[i]
      const exp2 = experiences[j]
      const start1 = new Date(exp1.startDate)
      const end1 = exp1.currentlyWorking ? new Date() : new Date(exp1.endDate!)
      const start2 = new Date(exp2.startDate)
      const end2 = exp2.currentlyWorking ? new Date() : new Date(exp2.endDate!)
      if (start1 <= end2 && start2 <= end1) {
        return true
      }
    }
  }
  return false
}