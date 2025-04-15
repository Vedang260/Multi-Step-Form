import { useFormStore } from '../../state/formStore'
import { calculateAge } from '../../utils/calculateAge'
import { Button } from '../common/Button'
import { motion } from 'framer-motion'

export const SummaryStep: React.FC = () => {
  const {
    personalInfo,
    experiences,
    educations,
    skills,
    references,
    skipReferences,
    prevStep,
    goToStep,
    nextStep,
  } = useFormStore()

  const totalExperienceYears = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate)
    const end = exp.currentlyWorking ? new Date() : new Date(exp.endDate!)
    const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    return acc + years
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Summary</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex justify-between items-center">
            Personal Information
            <Button onClick={() => goToStep(1)} variant="secondary">
              Edit
            </Button>
          </h3>
          <p>Full Name: {personalInfo.fullName}</p>
          <p>Email: {personalInfo.email}</p>
          <p>Phone: {personalInfo.phone}</p>
          {personalInfo.dob && <p>Age: {calculateAge(personalInfo.dob)}</p>}
          <p>Gender: {personalInfo.gender}</p>
          <p>Location: {personalInfo.location}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold flex justify-between items-center">
            Experience
            <Button onClick={() => goToStep(2)} variant="secondary">
              Edit
            </Button>
          </h3>
          {experiences.map((exp, index) => (
            <div key={index} className="mt-2">
              <p>
                <strong>{exp.jobTitle}</strong> at {exp.company}
              </p>
              <p>{exp.employmentType}</p>
              <p>
                {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
              </p>
            </div>
          ))}
          <p>Total Experience: {totalExperienceYears.toFixed(1)} years</p>
        </div>
        {educations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold flex justify-between items-center">
              Education
              <Button onClick={() => goToStep(3)} variant="secondary">
                Edit
              </Button>
            </h3>
            {educations.map((edu, index) => (
              <div key={index} className="mt-2">
                <p>
                  <strong>{edu.degree}</strong> in {edu.field}
                </p>
                <p>{edu.school}</p>
                <p>
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold flex justify-between items-center">
            Skills
            <Button onClick={() => goToStep(4)} variant="secondary">
              Edit
            </Button>
          </h3>
          <p>Skills Count: {skills.length}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-primary px-3 py-1 text-sm text-white"
              >
                {skill.name} {skill.years ? `(${skill.years} yrs)` : ''}
              </span>
            ))}
          </div>
        </div>
        {!skipReferences && references.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold flex justify-between items-center">
              References
              <Button onClick={() => goToStep(5)} variant="secondary">
                Edit
              </Button>
            </h3>
            {references.map((ref, index) => (
              <div key={index} className="mt-2">
                <p>
                  <strong>{ref.name}</strong>, {ref.relationship}
                </p>
                <p>{ref.company}</p>
                <p>{ref.contact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        <Button onClick={prevStep} variant="secondary">
          Previous
        </Button>
        <Button onClick={nextStep}>Proceed to Submit</Button>
      </div>
    </motion.div>
  )
}