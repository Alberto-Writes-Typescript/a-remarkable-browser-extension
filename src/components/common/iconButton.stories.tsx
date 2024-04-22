import iconButton from './iconButton'

export default {
  title: 'Common/IconButton',
  component: iconButton,
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
      options: ['small', 'medium', 'large']
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
