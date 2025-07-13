import { LynchNumbers } from 'app/components/lynchnumbers'
import { getLynchNumbers } from 'app/numbers/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  let { year, month } = await params
  let yearInt = Number(year)
  let monthInt = Number(month)
  let date = new Date(yearInt, monthInt - 1)

  return {
    title: new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date),
  }
}

export function generateStaticParams() {
  let allLynchNumbers = getLynchNumbers()

  return allLynchNumbers.map((lynchNumber) => ({
    year: String(lynchNumber.date.getFullYear()),
    month: String(lynchNumber.date.getMonth() + 1).padStart(2, '0'),
    day: String(lynchNumber.date.getDate()).padStart(2, '0'),
  }))
}

export default async function Page({ params }) {
  let { year, month } = await params
  let yearInt = Number(year)
  let monthInt = Number(month)

  let allLynchNumbers = getLynchNumbers()
  let dayLynchNumbers = allLynchNumbers
    .filter((lynchNumber) => lynchNumber.date.getFullYear() === yearInt)
    .filter((lynchNumber) => lynchNumber.date.getMonth() === monthInt - 1)
  if (dayLynchNumbers.length === 0) {
    notFound()
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">DAVID LYNCH THEATER Presents: Today's Number Is...</h1>
      <LynchNumbers LynchNumbers={dayLynchNumbers} />
    </section>
  )
}
