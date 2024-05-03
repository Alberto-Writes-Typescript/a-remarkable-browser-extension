import { type StoryFn } from '@storybook/react'

import IconButton, { ICON_BUTTON_SIZES, ICON_BUTTON_STYLES, type IconButtonProps } from './iconButton'

export default {
  title: 'Common/IconButton',
  component: IconButton,
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'a', 'div']
    },
    theme: {
      control: 'select',
      options: Object.keys(ICON_BUTTON_STYLES)
    },
    size: {
      control: 'select',
      options: Object.keys(ICON_BUTTON_SIZES)
    }
  }
}

const Template: StoryFn<IconButtonProps> = (args) => <IconButton {...args} />

export const Playground = Template.bind({})

export const Small = Template.bind({})
Small.args = { size: 'small' }

export const Medium = Template.bind({})
Medium.args = { size: 'medium' }

export const Primary = Template.bind({})
Primary.args = { theme: 'primary' }
