import Input, { type InputProps } from './input'
import { type Meta, type StoryFn } from '@storybook/react'

export default {
  title: 'Common/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    variant: {
      control: 'radio',
      options: ['primary', 'oneTimeCode']
    },
    placeholder: {
      control: 'text'
    }
  }
} satisfies Meta

const Template: StoryFn<InputProps> = (args) => <Input {...args} />

export const Playground = Template.bind({})

export const Small = Template.bind({})
Small.args = { size: 'small' }
Small.argTypes = {
  size: { table: { disable: true } }
}

export const Medium = Template.bind({})
Medium.args = { size: 'medium' }
Medium.argTypes = {
  size: { table: { disable: true } }
}

export const Large = Template.bind({})
Large.args = { size: 'large' }
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
