import { type StoryFn } from '@storybook/react'

import IconButton, { ICON_BUTTON_SIZES, ICON_BUTTON_VARIANTS, type IconButtonProps } from './iconButton'
import { ICONS_LIBRARY } from './icon'

export default {
  title: 'Common/IconButton',
  component: IconButton,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(ICONS_LIBRARY)
    },
    as: {
      control: 'select',
      options: ['button', 'a', 'div']
    },
    variant: {
      control: 'select',
      options: Object.keys(ICON_BUTTON_VARIANTS)
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
Small.args = { size: 'sm', icon: 'upload' }

export const Medium = Template.bind({})
Medium.args = { size: 'base', icon: 'upload' }

export const Large = Template.bind({})
Large.args = { size: 'lg', icon: 'upload' }

export const Primary = Template.bind({})
Primary.args = { variant: 'primary', icon: 'upload', size: 'base' }

export const Transparent = Template.bind({})
Transparent.args = { variant: 'transparent', icon: 'upload', size: 'base' }
