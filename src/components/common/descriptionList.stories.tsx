import { type Meta } from '@storybook/react'
import descriptionList, { DescriptionListDescription, DescriptionListTerm } from './descriptionList'

export default {
  title: 'Common/DescriptionList',
  component: descriptionList
} satisfies Meta

export const WithTermsViaArguments = {
  args: {
    listItems: {
      'Term 1': 'Description 1',
      'Term 2': 'Description 2',
      'Term ...': 'Description ...'
    }
  }
}

export const WithTermsViaChildren = {
  args: {
    children: (
      <>
        <DescriptionListTerm>Term 1</DescriptionListTerm>
        <DescriptionListDescription>Description 1</DescriptionListDescription>

        <DescriptionListTerm>Term 2</DescriptionListTerm>
        <DescriptionListDescription>Description 2</DescriptionListDescription>

        <DescriptionListTerm>Term ...</DescriptionListTerm>
        <DescriptionListDescription>Description ...</DescriptionListDescription>
      </>
    )
  }
}
