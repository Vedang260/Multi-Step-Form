import { useEffect } from 'react'
import { useFormStore } from '../state/formStore'

export const useAutosave = () => {
  const formState = useFormStore()

  useEffect(() => {
    localStorage.setItem('formState', JSON.stringify(formState))
  }, [formState])
}