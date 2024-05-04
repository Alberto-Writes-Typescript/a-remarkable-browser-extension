import button, { BUTTON_SIZES, BUTTON_VARIANTS } from './button'

export default {
  title: 'Common/Button',
  component: button,
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'a', 'div']
    },
    variant: {
      control: 'select',
      options: Object.keys(BUTTON_VARIANTS)
    },
    size: {
      control: 'select',
      options: Object.keys(BUTTON_SIZES)
    }
  }
}

export const Default = {
  args: {
    as: 'button',
    variant: 'primary',
    size: 'base',
    children: 'Button'
  }
}
