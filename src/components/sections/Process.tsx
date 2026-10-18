import { process } from '../../content/advisors'
import SectionHeading from '../SectionHeading'

export default function Process() {
  return (
    <section id="advisor-support" className="bg-surface section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={[process.heading[0], process.heading[1]]}
          description={process.body}
        />
      </div>
    </section>
  )
}
