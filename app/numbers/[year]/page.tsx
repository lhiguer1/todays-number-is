import { LynchNumbers } from 'app/components/lynchnumbers'
import { getLynchNumbers } from 'app/numbers/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  let { year } = await params
  return {
    title: year,
  }
}

export function generateStaticParams() {
  let allLynchNumbers = getLynchNumbers()
  let uniqueYears = Array.from(new Set(allLynchNumbers.map((lynchNumber) => lynchNumber.date.getFullYear())))

  return uniqueYears.map((year) => ({
    year: String(year),
  }))
}

export default async function Page({ params }) {
  let { year } = await params
  let yearInt = Number(year)

  let allLynchNumbers = getLynchNumbers()
  let yearLynchNumbers = allLynchNumbers.filter((lynchNumber) => lynchNumber.date.getFullYear() === yearInt)

  if (yearLynchNumbers.length === 0) {
    notFound()
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">DAVID LYNCH THEATER Presents: Today's Number Is...</h1>
      <LynchNumbers LynchNumbers={yearLynchNumbers} />
    </section>
  )
}
