import React from 'react'

export interface IconButtonProps {
  as?: 'button' | 'a' | 'div'
  theme?: 'primary'
  size?: 'small' | 'medium' | 'large'
  [x: string]: unknown
}

export const ICON_BUTTON_STYLES = {
  primary: `
    border border-gray-700 text-gray-700 font-semibold
    hover:bg-gray-700 hover:text-white
    disabled:bg-gray-300 disabled:text-gray-300
  `
}

export const ICON_BUTTON_SIZES = {
  small: 'h-[24px] w-[24px] text-xs',
  medium: 'h-[38px] w-[38px] text-base'
}

export default function Button ({ as, theme, size, ...rest }: IconButtonProps): React.ReactElement {
  const Component = as ?? 'button'
  const className = `
    flex items-center justify-center
    transition-all cursor-pointer disabled:cursor-not-allowed
    ${ICON_BUTTON_STYLES[theme ?? 'primary']}
    ${ICON_BUTTON_SIZES[size ?? 'medium']}
  `

  return (
    <Component
      className = {className}
      {...rest}
    >
      a
    </Component>
  )
}
