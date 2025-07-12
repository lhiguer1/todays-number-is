import { LynchNumbers } from 'app/components/lynchnumbers'
import { getLynchNumbers } from 'app/numbers/utils'
import { notFound } from 'next/navigation'

export function generateMetadata({ params: { year, month } }) {
  return {
    title: new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(new Date(year, month - 1))
  }
}

export async function generateStaticParams() {
  let allLynchNumbers = getLynchNumbers()

  return allLynchNumbers.map((lynchNumber) => ({
    year: String(lynchNumber.date.getFullYear()),
    month: String(lynchNumber.date.getMonth()),
  }))
}

export default function Page({ params }) {
  let allLynchNumbers = getLynchNumbers()
  let dayLynchNumbers = allLynchNumbers
    .filter((lynchNumber) => lynchNumber.date.getFullYear() === Number(params.year))
    .filter((lynchNumber) => lynchNumber.date.getMonth() === Number(params.month - 1))
  if (!dayLynchNumbers.length) {
    notFound()
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">DAVID LYNCH THEATER Presents: Today's Number Is...</h1>
      <LynchNumbers LynchNumbers={dayLynchNumbers} />
    </section>
  )
}
