import TrackDefinitionForm from '@/components/track-definition/track-definition-form/TrackDefinitionForm'
import Preview from '@/components/Preview'
import Controls from '@/components/Controls'
import Header from '@/components/ui/Header'
import Script from 'next/script'

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
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-4Z6H89W415" />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-4Z6H89W415');
      `}
    </Script>
    </>)
}
