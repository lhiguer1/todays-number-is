import { getLynchNumbers } from 'app/numbers/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  let { year, month, day } = await params
  let yearInt = Number(year)
  let monthInt = Number(month)
  let dayInt = Number(day)
  let date = new Date(yearInt, monthInt - 1, dayInt)

  let allLynchNumbers = getLynchNumbers()
  let dayLynchNumber = allLynchNumbers.find((lynchNumber) => lynchNumber.date.toISOString().split('T')[0] === date.toISOString().split('T')[0])

  if (dayLynchNumber) {
    return {
      title: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(dayLynchNumber.date),
    }
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
  let { year, month, day } = await params
  let yearInt = Number(year)
  let monthInt = Number(month)
  let dayInt = Number(day)
  let date = new Date(yearInt, monthInt - 1, dayInt)

  let allLynchNumbers = getLynchNumbers()
  let dayLynchNumber = allLynchNumbers.find((lynchNumber) => lynchNumber.date.toISOString().split('T')[0] === date.toISOString().split('T')[0])

  if (!dayLynchNumber) {
    notFound()
  }

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(dayLynchNumber.date)}
      </h1>
      <article className="prose">
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${dayLynchNumber.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <p>{dayLynchNumber.transcript}</p>
      </article>
    </section >
  )
}
