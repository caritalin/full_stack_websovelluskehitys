import { useState } from 'react'

// Statistics-komponentti, joka vastaanottaa propsina kaikki tarvittavat tiedot
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100

  // Jos palautteita ei ole annettu
  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All feedback: {total}</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Positive feedback: {positivePercentage.toFixed(2)} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      {/* Statistics-komponentti, jolle välitetään tarvittavat propsit */}
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App