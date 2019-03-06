import React, { useState, useCallback } from 'react'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import './App.css'

const email = 'windstormdota@hotmail.com'
const subject = 'Dota Wadafaaaak'

function App () {
  const [type, setType] = useState('')
  const [gameID, setGameID] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [heroes, setHeroes] = useState('')
  const [minReplay, setMinReplay] = useState('')
  const [description, setDescription] = useState('')

  const handleTypeChange = useCallback((e) => setType(e.currentTarget.value), [])
  const handleGameIDChange = useCallback((e) => setGameID(e.currentTarget.value), [])
  const handlePlayerNameChange = useCallback((e) => setPlayerName(e.currentTarget.value), [])
  const handleHeroesChange = useCallback((e) => setHeroes(e.currentTarget.value), [])
  const handleMinReplayChange = useCallback((e) => setMinReplay(e.currentTarget.value), [])
  const handleDescriptionChange = useCallback((e) => setDescription(e.currentTarget.value), [])

  const emailBody = `# Type

${type}

# gameID

${gameID}

# Player Name

${playerName}

# Heroes

${heroes}

# Min Replay

${minReplay}

# Description

${description}
`

  return (
      <Container className="App-container align-items-center justify-content-center">
        <Jumbotron className="">
          <h1 className='display-4'>Submit your Clip</h1>
          <FormGroup>
            <FormLabel htmlFor="type">Type</FormLabel>
            <input className='form-control' type="text" required id="type" name="type" value={type} onChange={handleTypeChange} placeholder="Win / Fail / Rampage..." />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="gameID">Game ID</FormLabel>
            <input className='form-control' type="text" required id="gameID" name="Game ID" value={gameID} onChange={handleGameIDChange} placeholder="123456789" />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="playerName">Player Name</FormLabel>
            <input className='form-control' type="text" required id="playerName" name="Player Name" value={playerName} onChange={handlePlayerNameChange} placeholder="WindStorm" />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="heroes">Heroes</FormLabel>
            <input className='form-control' type="text" id="heroes" name="heroes" required value={heroes} onChange={handleHeroesChange} placeholder="Earth Spirit" />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="min replay">Min Replay</FormLabel>
            <input className='form-control' type="text" id="min replay" name="min replay" required value={minReplay} onChange={handleMinReplayChange} placeholder="12" />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="description">Description</FormLabel>
            <textarea className='form-control' id="description" name="description" required value={description} onChange={handleDescriptionChange} placeholder="Die like a noob" />
          </FormGroup>
          <a href={encodeURI(`mailto:${email}?subject=${subject}&body=${emailBody}`)}>
            <Button className='form-control'>Create email</Button>
          </a>
        </Jumbotron>
      </Container>
  )
}

export default App
