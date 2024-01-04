import TrackDefinitionForm from '@/components/track-definition/track-definition-form/TrackDefinitionForm'
import Preview from '@/components/Preview'
import Controls from '@/components/Controls'
import Header from '@/components/ui/Header'

export default function Home() {
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
