import React from 'react'

import Icon, { type IconProps } from './icon'

export interface IconButtonProps {
  icon: 'upload'
  as?: 'button' | 'a' | 'div'
  theme?: 'primary'
  size?: 'sm' | 'base'
  [x: string]: unknown
}

export const ICON_BUTTON_STYLES = {
  primary: `
    group/button
    border border-gray-700 text-gray-700  font-semibold
    hover:bg-gray-700 hover:text-white
    disabled:bg-gray-300 disabled:text-gray-300
  `
}

export const ICON_BUTTON_ICON_STYLES = {
  primary: `
    text-gray-700
    group-hover/button:text-white
    group-disabled/button:text-gray-300
  `
}

export const ICON_BUTTON_SIZES = {
  sm: 'h-[24px] w-[24px]',
  base: 'h-[34px] w-[34px]'
}

export const ICON_BUTTON_ICON_SIZES = {
  sm: 'xs',
  base: 'sm'
}

export default function Button ({ icon, as, theme, size, ...rest }: IconButtonProps): React.ReactElement {
  const Component = as ?? 'button'

  const className = `
    flex items-center justify-center
    transition-all cursor-pointer disabled:cursor-not-allowed
    ${ICON_BUTTON_STYLES[theme ?? 'primary']}
    ${ICON_BUTTON_SIZES[size ?? 'medium']}
  `

  const iconProps = {
    icon,
    className: ICON_BUTTON_ICON_STYLES[theme ?? 'primary'],
    size: ICON_BUTTON_ICON_SIZES[size ?? 'base'] as 'xs' | 'sm' | 'base' | 'lg'
  } satisfies IconProps

  return (
    <Component className = {className} {...rest}>
      <Icon {...iconProps}/>
    </Component>
  )
}
