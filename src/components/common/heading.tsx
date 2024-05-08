import Icon, { type IconName, type IconSize } from './icon'

export type HeadingSize = 'h1' | 'h2' | 'h3'

export const HEADING_STYLES = {
  h1: '!text-2xl',
  h2: '!text-xl',
  h3: '!text-lg'
}

const ICON_SIZES = {
  h1: 'sm',
  h2: 'xs',
  h3: 'xxs'
}

export interface HeadingProps {
  as?: HeadingSize
  leadingIcon?: IconName
  trailingIcon?: IconName
  children?: React.ReactNode
  [x: string]: unknown
}

export default function Heading ({ as, leadingIcon, trailingIcon, children, ...rest }: HeadingProps): React.ReactElement {
  const Component = as ?? 'h1'

  const className = `
    inline-flex items-center gap-2 text-xl font-semibold tracking-wide
    ${HEADING_STYLES[as ?? 'h1']}
    ${rest.className as string}
  `

  delete rest.className

  return (
    <Component className={className} {...rest}>
      { leadingIcon != null ? <Icon icon={leadingIcon} size={ICON_SIZES[Component] as IconSize}/> : null }
      <div>{children}</div>
      { trailingIcon != null ? <Icon icon={trailingIcon} size={ICON_SIZES[Component] as IconSize}/> : null }
    </Component>
  )
}
