import React from 'react'

type InputProps = Record<string, unknown>

export default function Button ({ ...rest }: InputProps): React.ReactElement {
  const className = `
    p-2 bg-transparent border border-gray-600 text-sm text-gray-600 text-center
    transition-all
    focus:border-gray-700 focus:bg-gray-100 focus:outline-none focus:ring-0
    hover:border-gray-700 hover:bg-gray-100
  `

  return (
    <input className={className} {...rest}/>
  )
}
