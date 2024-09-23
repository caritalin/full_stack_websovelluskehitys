import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0)) // Taulukko äänille

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1 // Lisää ääni valitulle anekdootille
    setPoints(copy) // Päivitä äänten tila
  }

  const getMostVotedAnecdote = () => {
    const maxVotes = Math.max(...points)
    const index = points.indexOf(maxVotes)
    return maxVotes > 0 ? anecdotes[index] : null // Palauttaa anekdootin, jos ääniä on
  }

  return (
    <div>
      <h2>Anekdootti</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={getRandomAnecdote}>Next anecdote</button>

      <h2>Eniten ääniä saanut anekdootti</h2>
      {getMostVotedAnecdote() ? (
        <p>{getMostVotedAnecdote()} (Has {Math.max(...points)} votes)</p>
      ) : (
        <p>Ei äänestyksiä vielä.</p>
      )}
    </div>
  )
}

export default App
