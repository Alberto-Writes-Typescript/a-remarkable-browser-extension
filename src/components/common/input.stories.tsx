import Input, { INPUT_SIZES, INPUT_VARIANTS, type InputProps } from './input'
import { type Meta, type StoryFn } from '@storybook/react'

export default {
  title: 'Common/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'radio',
      options: Object.keys(INPUT_SIZES)
    },
    variant: {
      control: 'radio',
      options: Object.keys(INPUT_VARIANTS)
    },
    placeholder: {
      control: 'text'
    }
  }
} satisfies Meta

const Template: StoryFn<InputProps> = (args) => <Input {...args} />

export const Playground = Template.bind({})

export const ExtraSmall = Template.bind({})
ExtraSmall.args = { size: 'xs' }
ExtraSmall.argTypes = {
  size: { table: { disable: true } }
}

export const Small = Template.bind({})
Small.args = { size: 'sm' }
Small.argTypes = {
  size: { table: { disable: true } }
}

export const Medium = Template.bind({})
Medium.args = { size: 'base' }
Medium.argTypes = {
  size: { table: { disable: true } }
}

export const Large = Template.bind({})
Large.args = { size: 'lg' }
Large.argTypes = {
  size: { table: { disable: true } }
}

export const Primary = Template.bind({})
Primary.args = { variant: 'primary' }
Primary.argTypes = {
  variant: { table: { disable: true } }
}

export const OneTimeCode = Template.bind({})
OneTimeCode.args = { variant: 'oneTimeCode' }
OneTimeCode.argTypes = {
  variant: { table: { disable: true } }
}

export const Transparent = Template.bind({})
Transparent.args = { variant: 'transparent' }
Transparent.argTypes = {
  variant: { table: { disable: true } }
}
