import { type StoryFn } from '@storybook/react'

import Heading, { type HeadingProps, HEADING_STYLES } from './heading'
import { ICONS_LIBRARY } from './icon'

export default {
  title: 'Common/Heading',
  component: Heading,
  argTypes: {
    as: {
      control: 'select',
      options: Object.keys(HEADING_STYLES)
    },
    leadingIcon: {
      control: 'select',
      options: Object.keys(ICONS_LIBRARY)
    },
    trailingIcon: {
      control: 'select',
      options: Object.keys(ICONS_LIBRARY)
    }
  }
}

const Template: StoryFn<HeadingProps> = (args) => <Heading {...args} >Heading</Heading>

export const Playground = Template.bind({})

export const H1 = Template.bind({})
H1.args = { as: 'h1' }

export const H2 = Template.bind({})
H2.args = { as: 'h2' }

export const H3 = Template.bind({})
H3.args = { as: 'h3' }
