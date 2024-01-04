'use client'

import useTrackDefinition from '@/stores/useTrackDefinition'
import { PreviewSerializer } from '@/utils/serializer'

export default function Preview() {
    // todo add ability to show and hide preview
    const json = useTrackDefinition().toUIJSON
    
    return (<div className="sticky top-0 overflow-auto overscroll-auto">
        <pre className="font-mono text-wrap p-4 object-top bg-slate-100 dark:bg-slate-800">
            <code>
                {PreviewSerializer(json())}
            </code>
        </pre>
    </div>)
}