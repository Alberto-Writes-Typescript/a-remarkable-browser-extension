import React from 'react'

export type InputVariant = 'box' | 'primary' | 'oneTimeCode' | 'transparent'

export interface InputProps {
  size?: 'xs' | 'sm' | 'base' | 'lg'
  variant?: InputVariant
  [x: string]: unknown
}

export const INPUT_SIZES = {
  xs: 'px-1 text-xs',
  sm: 'py-1 px-2 text-sm',
  base: 'py-2 px-2 text-base',
  lg: 'py-2.5 px-2 text-lg'
}

export const INPUT_VARIANTS = {
  box: `
    border border-gray-400 text-gray-600
    focus:border-gray-700 focus:bg-gray-100
    hover:border-gray-700 hover:bg-gray-100
    disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-400
  `,
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
    hover:bg-gray-50
    focus:bg-gray-50
  `
}

export default function Button ({ size, variant, ...rest }: InputProps): React.ReactElement {
  const className = `
    transition-all bg-transparent
    focus:outline-none focus:ring-0
    ${INPUT_SIZES[size ?? 'base']}
    ${INPUT_VARIANTS[variant ?? 'primary']}
    ${rest.className as string}
  `

  delete rest.className

  return (
    <input className={className} {...rest}/>
  )
}
