import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded-md font-medium transition-colors ${
      variant === 'primary'
        ? 'bg-primary text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
    {...props}
  >
    {children}
  </button>
)