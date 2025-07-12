import Link from 'next/link'

export function LynchNumbers({ LynchNumbers }: { LynchNumbers: LynchNumber[] }) {
  return (
    <div>
      {LynchNumbers
        .sort((a, b) => a.date < b.date ? -1 : 1)
        .map((lynchNumber) => {
          let { year, month, day } = {
            year: lynchNumber.date.getFullYear(),
            month: lynchNumber.date.getMonth() + 1,
            day: lynchNumber.date.getDate(),
          }
          return <Link
            key={`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
            className="flex flex-col space-y-1 mb-4"
            href={`/numbers/${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`}
          >
            <div className="w-full flex flex-row space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[200px] tabular-nums">
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }).format(lynchNumber.date)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {lynchNumber.number}
              </p>
            </div>
          </Link>
        })}
    </div>
  )
}
