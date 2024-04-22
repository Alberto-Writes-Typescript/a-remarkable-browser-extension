import React from 'react'

interface DescriptionListDescriptionProps {
  children?: React.ReactNode
  [x: string]: unknown
}

export function DescriptionListDescription ({ children, ...rest }: DescriptionListDescriptionProps): React.ReactElement {
  return (
    <dd className="py-2 text-end border-b border-gray-200 last-of-type:border-0 text-sm" {...rest}>
      {children}
    </dd>
  )
}

export interface DescriptionListTermProps {
  children?: React.ReactNode
  [x: string]: unknown
}

export function DescriptionListTerm ({ children, ...rest }: DescriptionListTermProps): React.ReactElement {
  return (
    <dt className="py-2 border-b border-gray-200 last-of-type:border-0 text-sm font-thin" {...rest}>
      {children}
    </dt>
  )
}

export interface DescriptionListProps {
  listItems?: Record<string, React.ReactNode>
  children?: React.ReactNode
  [x: string]: unknown
}

export default function DescriptionList ({ listItems, children, ...rest }: DescriptionListProps): React.ReactElement {
  function descriptionListItems (): React.ReactNode {
    if (listItems === undefined) return null

    return Object.keys(listItems).map((term, index) => {
      const description = listItems[term]

      return (
        <React.Fragment key={index}>
          <DescriptionListTerm>{term}</DescriptionListTerm>
          <DescriptionListDescription>{description}</DescriptionListDescription>
        </React.Fragment>
      )
    })
  }

  return (
    <dl className="grid grid-cols-2 px-3 py-1 border border-gray-500 text-gray-600">
      {descriptionListItems()}
      {children}
    </dl>
  )
}
