export {}

document.addEventListener('mouseover', ({ target }) => {
  if (target == null) return

  const link = (target as HTMLElement).closest('a')

  if (link == null) return

  const previousLink = document.getElementById('cacahue')

  if (link.isSameNode(previousLink)) return

  link.id = 'cacahue'
})

document.addEventListener('mouseout', ({ target }) => {
  return

  if (target == null) return

  const link = (target as HTMLElement).closest('#cacahue')

  if (link != null) link.removeAttribute('id')
})
