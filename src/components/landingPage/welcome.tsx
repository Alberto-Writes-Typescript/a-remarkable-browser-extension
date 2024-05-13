import React from 'react'

import Icon from '../common/icon'
import IconButton from '../common/iconButton'

function Welcome (): React.ReactElement {
  return (
    <div className='h-full w-full p-24 overflow-hidden'>
      <div className='relative h-full w-full border border-gray-400 flex flex-col justify-between'>
        <div className='absolute h-full w-full flex items-center justify-center'>
          <div className='m-auto w-[34%] flex flex-col items-start'>
            <Icon icon='logo' size='lg' className='w-32 h-32'/>

            <h1 className='space-x-1 font-serif text-justify text-xl text-gray-400'>
              <b className='text-gray-500'>arbe</b>
              <span>/ˈɑːr.be/</span>
              <b className='text-gray-500 italic'>noun.</b>
              <b className='text-gray-500'>1.</b> browser extension for uploading documents to reMarkable Cloud in one click.
              <b className='text-gray-500'>2.</b> efficient and safe way to synchornize your online documents to a reMarkable tablet.
              <b className='text-gray-500 italic'>verb.</b>
              <b className='text-gray-500'>1.</b> act of synchornizing a web document with reMarkable Cloud as fast as possible.
            </h1>
          </div>
        </div>

        <div className='absolute bottom-8 right-16 flex flex-col items-end gap-2'>
          <div className='inline-flex items-center gap-3'>
            <p className='text-xl text-gray-500 font-semibold text-end'>available for:</p>
            <div className='inline-flex gap-2'>
              <IconButton icon='chrome' as='a' variant='transparent' size='lg'/>
            </div>
          </div>
          <p className='text-xs italic text-gray-400'>* arbe is an <b>un-official reMarkable web browser extension</b></p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
