import button from './button'

export default {
  title: 'Common/Button',
  component: button,
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'a', 'div']
    },
    theme: {
      control: 'select',
      options: ['primary']
    },
    size: {
      control: 'select',
      options: ['medium']
    }
  }
}

export const Default = {
  args: {
    as: 'button',
    theme: 'primary',
    size: 'medium',
    children: 'Button'
  }
}
