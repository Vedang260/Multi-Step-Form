import { useState } from 'react'
import { Skill } from '../../types/form'

interface ChipInputProps {
  skills: Skill[]
  predefinedSkills: string[]
  onChange: (skills: Skill[]) => void
}

export const ChipInput: React.FC<ChipInputProps> = ({
  skills,
  predefinedSkills,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleAddSkill = (skillName: string) => {
    if (skillName && !skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      onChange([...skills, { name: skillName }])
      setInputValue('')
      setShowSuggestions(false)
    }
  }

  const handleRemoveSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index))
  }

  const handleYearsChange = (index: number, years: number) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, years } : skill
    )
    onChange(updatedSkills)
  }

  const filteredSuggestions = predefinedSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase()) &&
      !skills.some((s) => s.name.toLowerCase() === skill.toLowerCase())
  )

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Skills</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setShowSuggestions(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputValue) {
              e.preventDefault()
              handleAddSkill(inputValue)
            }
          }}
          className="mt-1 block w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Add a skill..."
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
            {filteredSuggestions.map((skill) => (
              <li
                key={skill}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleAddSkill(skill)}
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-primary px-3 py-1 text-sm text-white"
          >
            {skill.name}
            <input
              type="number"
              min="0"
              placeholder="Yrs"
              className="ml-2 w-12 rounded-md border p-1 text-black"
              value={skill.years || ''}
              onChange={(e) => handleYearsChange(index, Number(e.target.value))}
            />
            <button
              onClick={() => handleRemoveSkill(index)}
              className="ml-2 text-white hover:text-red-300"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}