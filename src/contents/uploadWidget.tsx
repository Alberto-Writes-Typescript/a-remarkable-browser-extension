import React from 'react'
import { type PlasmoGetOverlayAnchorList } from 'plasmo'
import styleText from 'data-text:../../assets/css/style.css'

import '../../assets/css/style.css'

/**
 * Script Configuration
 */
export const getStyle = (): HTMLStyleElement => {
  const style = document.createElement('style')
  style.textContent = styleText
  return style
}

// @ts-expect-error - Expected error
export const getInlineAnchorList: PlasmoGetOverlayAnchorList =
  async () => {
    return Array.from(document.querySelectorAll('a')).filter((link) => {
      return link.href.endsWith('.pdf')
    })
  }

/**
 * Component Definition
 */
const CustomButton = (): React.ReactElement => {
  return <button className="mt-4">Custom button</button>
}

export default CustomButton
