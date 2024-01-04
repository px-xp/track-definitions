'use client'

import { PreviewSerializer } from '@/utils/serializer'
import useTrackDefinition from '../../stores/useTrackDefinition'
import { ArrowDownCircleIcon } from '@heroicons/react/16/solid'
import Button from '../ui/Button'
import deserializer from '@/utils/deserializer/deserializer'
import { useRef } from 'react'

export default function Save() {
    const reset = useTrackDefinition().reset

    const handleSave = () => {
        const json = useTrackDefinition().toUIJSON
        const data = json()
        const content = PreviewSerializer(data)
        const trackname = (data.TRACKNAME ?? 'track').replace(/[\/\?<>\\:*|"]/g, '_').replace(/[+ ]/g, '_')
        const filename = `${trackname}_td_${Date.now()}.txt`
        const blob = new Blob([content], {type: 'text/plain'});
        
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename)
        } else {
            const elem = document.createElement('a')
            elem.href = window.URL.createObjectURL(blob)
            elem.download = filename
            document.body.appendChild(elem)
            elem.click()
            document.body.removeChild(elem)
        }
    } 

    const fileInputRef = useRef(null)

    const openFileSelector = () => {
        fileInputRef.current.click()
    }

    const updateFromUpload = useTrackDefinition().updateFromUpload
    
    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = async (e) => {
                // Read the file content and update state
                const fileContent = e.target.result

                const nextState = await deserializer(fileContent)
                updateFromUpload(nextState)
            }
    
            // Read the file as text or perform other types of reading based on your needs
            reader.readAsText(file)
            fileInputRef.current.value = ''
        }
    }

    return (<div className="flex space-x-4 content-center mb-4 pb-1 dark:text-black">
        <Button text="Save To Disk" bg="bg-green-200 hover:bg-green-400" onClick={handleSave}><ArrowDownCircleIcon className="w-4 h-4 mr-2"/></Button>
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        />
        <Button text="Upload Definition" bg="bg-pink-200 hover:bg-pink-400" onClick={openFileSelector}/>
        <Button text="Reset" bg="bg-orange-200 hover:bg-orange-400" onClick={reset}/>
    </div>)
}