import DashboardComponent from '../src/components/debugger/DashboardComponent'

import '../assets/css/style.css'

function IndexPopup (): JSX.Element {
  return (
    <div className="bg-transparent w-fit min-w-[500px]">
      <DashboardComponent/>
    </div>
  )
}

export default IndexPopup
