import React from 'react'

export interface InputProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'oneTimeCode' | 'transparent'
  [x: string]: unknown
}

const INPUT_SIZES = {
  small: 'text-sm',
  medium: 'py-2 text-sm',
  large: 'py-3 text-base'
}

const INPUT_VARIANTS = {
  primary: `
    border-b border-gray-400 text-gray-600
    focus:border-gray-700
    hover:border-gray-700
  `,
  oneTimeCode: `
    border border-gray-400 text-gray-600 text-center
    focus:border-gray-700 focus:bg-gray-100
    hover:border-gray-700 hover:bg-gray-100
    disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-400
  `,
  transparent: `
    !p-0 text-gray-600
    disabled:text-gray-400
  `
}

export default function Button ({ size, variant, ...rest }: InputProps): React.ReactElement {
  const className = `
    transition-all bg-transparent
    focus:outline-none focus:ring-0
    ${INPUT_SIZES[size ?? 'medium']}
    ${INPUT_VARIANTS[variant ?? 'primary']}
  `

  return (
    <input className={className} {...rest}/>
  )
}
