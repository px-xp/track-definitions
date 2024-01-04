
import TrackDefinitionForm from '../../components/track-definition/track-definition-form/TrackDefinitionForm'
import Preview from '../../components/preview/Preview'
import Controls from '../../components/controls/Controls'
import Header from '@/components/ui/Header'

export default function Page() {
    return (<>
    <Header text="Creator Tool"/>
    <Controls/>
    <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
            <TrackDefinitionForm/>
        </div>
        <div>
            <Preview/>
        </div>
    </div>
    </>)
}