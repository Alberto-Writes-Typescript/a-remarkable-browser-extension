import { type StoryFn } from '@storybook/react'

import Icon, { ICON_SIZES, type IconProps, ICONS_LIBRARY } from './icon'

export default {
  title: 'Common/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(ICON_SIZES)
    },
    icon: {
      control: 'select',
      options: Object.keys(ICONS_LIBRARY)
    }
  }
}

const Template: StoryFn<IconProps> = (args) => <Icon {...args} />

export const Playground = Template.bind({})
