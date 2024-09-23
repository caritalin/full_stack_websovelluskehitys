import { useState } from 'react'

// Button-komponentti palautteen antamista varten
const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

// StatisticLine-komponentti yksittäisen tilastorivin näyttämiseen
const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  )
}

// Statistics-komponentti, joka käyttää StatisticLine-komponenttia
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
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all feedback" value={total} />
      <StatisticLine text="average" value={average.toFixed(2)} />
      <StatisticLine text="positive feedback" value={`${positivePercentage.toFixed(2)} %`} />
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
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />

      {/* Statistics-komponentti, jolle välitetään tarvittavat propsit */}
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
