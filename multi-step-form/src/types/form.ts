export interface PersonalInfo{
    fullName: string
    email: string
    phone: string
    dob?: string
    gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say'
    location: string
    educationLevel?: 'High School' | 'Undergraduate' | 'Graduate or higher'
}

export interface Experience{
    jobTitle: string
    company: string
    employmentType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract' | 'Freelance'
    startDate: string
    endDate?: string
    currentlyWorking: boolean
    responsibilities: string
}

export interface Education{
    school: string
    degree: string
    field: string
    startYear: string
    endYear: string
    grade?: string
    certificates?: { name: string; file?: File}[]
}

export interface Skill {
    name: string
    years?: number
}

export interface Reference {
    name: string
    relationship: string
    company: string
    contact: string
}