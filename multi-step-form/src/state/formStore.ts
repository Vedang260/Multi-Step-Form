import { create } from 'zustand'
import { PersonalInfo, Experience, Education, Skill, Reference } from '../types/form'

interface FormState {
  step: number
  personalInfo: PersonalInfo
  experiences: Experience[]
  educations: Education[]
  skills: Skill[]
  references: Reference[]
  skipReferences: boolean
  setPersonalInfo: (data: PersonalInfo) => void
  addExperience: (data: Experience) => void
  updateExperience: (index: number, data: Experience) => void
  removeExperience: (index: number) => void
  addEducation: (data: Education) => void
  updateEducation: (index: number, data: Education) => void
  removeEducation: (index: number) => void
  setSkills: (skills: Skill[]) => void
  addReference: (data: Reference) => void
  updateReference: (index: number, data: Reference) => void
  removeReference: (index: number) => void
  setSkipReferences: (skip: boolean) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
}

export const useFormStore = create<FormState>((set) => ({
  step: 1,
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    gender: 'Prefer not to say',
    location: '',
    educationLevel: 'High School',
  },
  experiences: [],
  educations: [],
  skills: [],
  references: [],
  skipReferences: false,
  setPersonalInfo: (data) => set({ personalInfo: data }),
  addExperience: (data) => set((state) => ({ experiences: [...state.experiences, data] })),
  updateExperience: (index, data) =>
    set((state) => ({
      experiences: state.experiences.map((exp, i) => (i === index ? data : exp)),
    })),
  removeExperience: (index) =>
    set((state) => ({
      experiences: state.experiences.filter((_, i) => i !== index),
    })),
  addEducation: (data) => set((state) => ({ educations: [...state.educations, data] })),
  updateEducation: (index, data) =>
    set((state) => ({
      educations: state.educations.map((edu, i) => (i === index ? data : edu)),
    })),
  removeEducation: (index) =>
    set((state) => ({
      educations: state.educations.filter((_, i) => i !== index),
    })),
  setSkills: (skills) => set({ skills }),
  addReference: (data) => set((state) => ({ references: [...state.references, data] })),
  updateReference: (index, data) =>
    set((state) => ({
      references: state.references.map((ref, i) => (i === index ? data : ref)),
    })),
  removeReference: (index) =>
    set((state) => ({
      references: state.references.filter((_, i) => i !== index),
    })),
  setSkipReferences: (skip) => set({ skipReferences: skip }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  goToStep: (step) => set({ step }),
}))