import React from 'react'
import PairDebuggerComponent from './PairDebuggerComponent'
import ConnectDebuggerComponent from './ConnectDebuggerComponent'
import UnpairDebuggerComponent from './UnpairDebuggerComponent'
import DisconnectDebuggerComponent from './DisconnectDebuggerComponent'

export default function DashboardComponent (): React.ReactElement {
  return (
    <div className="p-4 bg-transparent text-gray-500 text-sm">
      <div className="py-4 px-6 space-y-8 border-[1.5px] border-gray-400 rounded-lg bg-white">
        <h1 className="font-semibold text-base">Debug Panel</h1>

        <hr/>

        <PairDebuggerComponent/>
        <UnpairDebuggerComponent/>
        <ConnectDebuggerComponent/>
        <DisconnectDebuggerComponent/>
      </div>
    </div>
  )
}
