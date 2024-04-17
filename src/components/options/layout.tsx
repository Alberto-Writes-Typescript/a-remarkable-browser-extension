import React from 'react'

interface LayoutProps {
  children: React.ReactElement
}

function Layout ({ children }: LayoutProps): React.ReactElement {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-fit min-h-[800px] w-[550px] flex flex-row border bg-gray-50 border-gray-700 rounded">
        <div className="w-8 bg-gray-700 relative">
          <p className="absolute bottom-6 text-xs text-white -rotate-90">v0.1.0</p>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
