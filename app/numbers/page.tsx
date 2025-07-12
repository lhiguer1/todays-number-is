import { LynchNumbers } from 'app/components/lynchnumbers'
import { getLynchNumbers } from 'app/numbers/utils'

export default function Page() {

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">DAVID LYNCH THEATER Presents: Today's Number Is...</h1>
      <LynchNumbers LynchNumbers={getLynchNumbers()} />
    </section>
  )
}
