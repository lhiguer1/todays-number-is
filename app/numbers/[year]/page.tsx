import { LynchNumbers } from 'app/components/lynchnumbers'
import { getLynchNumbers } from 'app/numbers/utils'
import { notFound } from 'next/navigation'

export function generateMetadata({ params: { year } }) {
  return {
    title: year,
  }
}

export async function generateStaticParams() {
  let allLynchNumbers = getLynchNumbers()

  return allLynchNumbers.map((lynchNumber) => ({
    year: String(lynchNumber.date.getFullYear()),
  }))
}

export default function Page({ params }) {
  let allLynchNumbers = getLynchNumbers()
  let yearLynchNumbers = allLynchNumbers
    .filter((lynchNumber) => lynchNumber.date.getFullYear() === Number(params.year))

  if (!yearLynchNumbers.length) {
    notFound()
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">DAVID LYNCH THEATER Presents: Today's Number Is...</h1>
      <LynchNumbers LynchNumbers={yearLynchNumbers} />
    </section>
  )
}
