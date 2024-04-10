interface UploadWidgetComponentProps {
  url: string
}

export default function UploadWidgetComponent ({ url }: UploadWidgetComponentProps): React.ReactElement {

  function requestUpload () {
    console.log('me llama')
  }

  return (
    <button
      onClick={requestUpload}
      className="group h-8 w-8 hover:w-24 flex flex-row items-center justify-center bg-gray-700 rounded-full text-xs transition-all"
    >
      <p>💾</p>
      <p className="overflow-hidden w-0 group-hover:block group-hover:w-12 group-hover:ml-2 transition-all text-white">Upload</p>
    </button>
  )
}
