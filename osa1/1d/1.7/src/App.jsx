import { useState } from 'react'

const App = () => {
  // Tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Yhteenlaskettu määrä
  const total = good + neutral + bad

  // Keskiarvo (hyvä = 1, neutraali = 0, huono = -1)
  const average = total === 0 ? 0 : (good - bad) / total

  // Positiivisten palautteiden prosentti
  const positivePercentage = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>All feedback: {total}</p>
          <p>Average: {average.toFixed(2)}</p>
          <p>Positive feedback: {positivePercentage.toFixed(2)} %</p>
        </div>
      )}
    </div>
  )
}

export default App
