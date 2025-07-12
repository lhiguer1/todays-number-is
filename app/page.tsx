import { getLynchNumbers } from 'app/numbers/utils'
import { mean, mode, median } from 'mathjs'

export default function Page() {
  let allLynchNumbers = getLynchNumbers()

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        DAVID LYNCH THEATER Presents: Today's Number Is...
      </h1>
      <p className="mb-4">
        {`Here we go for today's number. Ten balls, each ball has a number, numbers one through ten. Swirl the numbers. Pick a number. Today's number is...`}
      </p>
      <article className='prose'>
        <h2>Sequence</h2>
        <p>{allLynchNumbers.map(lynchNumber => lynchNumber.number).join(', ')}</p>
      </article>
      <article className='prose'>
        <h2>Statistics</h2>
        <ul>
          <li>Count: {allLynchNumbers.length}</li>
          <li>Sum: {allLynchNumbers.reduce((acc, { number }) => acc + number, 0)}</li>
          <li>Median: {median(allLynchNumbers.map(lynchNumber => lynchNumber.number))}</li>
          <li>Mean: {mean(allLynchNumbers.map(lynchNumber => lynchNumber.number))}</li>
          <li>Mode: {mode(allLynchNumbers.map(lynchNumber => lynchNumber.number))}</li>
        </ul>
      </article>
      <article className='prose'>
        <h2>Frequency</h2>
        <ul>
          {Object.entries(allLynchNumbers.reduce((acc, { number }) => {
            acc[number] = (acc[number] || 0) + 1;
            return acc;
          }, {})).map(([num, freq]) => (
            <li key={num}>{`Number ${num}: ${freq} times`}</li>
          ))}
        </ul>
      </article>
    </section>
  )
}
