import { getLynchNumbers } from 'app/numbers/utils'
import { notFound } from 'next/navigation'

export function generateMetadata({ params: { year, month, day } }) {
  let lynchNumber = getLynchNumbers().find((lynchNumber) => lynchNumber.date.getFullYear() === Number(year) && lynchNumber.date.getMonth() === Number(month - 1) && lynchNumber.date.getDate() === Number(day))
  if (lynchNumber) {
    return {
      title: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(lynchNumber.date),
    }
  }
}

export async function generateStaticParams() {
  let allLynchNumbers = getLynchNumbers()

  return allLynchNumbers.map((lynchNumber) => ({
    year: String(lynchNumber.date.getFullYear()),
    month: String(lynchNumber.date.getMonth() + 1),
    day: String(lynchNumber.date.getDate()),
  }))
}

export default function Page({ params }) {
  let allLynchNumbers = getLynchNumbers()
  let dayLynchNumber = allLynchNumbers.find((lynchNumber) => lynchNumber.date.getFullYear() === Number(params.year) && lynchNumber.date.getMonth() === Number(params.month - 1) && lynchNumber.date.getDate() === Number(params.day))

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
