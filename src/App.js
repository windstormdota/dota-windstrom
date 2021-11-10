import React, { useState, useCallback } from 'react'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import './App.css'
import { sendEmail } from './send-email'

const STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

function App () {
  const [type, setType] = useState('')
  const [gameID, setGameID] = useState('')
  const [division, setDivision] = useState('')
  const [team, setTeam] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [heroes, setHeroes] = useState('')
  const [minReplay, setMinReplay] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const handleTypeChange = useCallback((e) => setType(e.currentTarget.value), [])
  const handleGameIDChange = useCallback((e) => setGameID(e.currentTarget.value), [])
  const handleDivisionChange = useCallback((e) => setDivision(e.currentTarget.value), [])
  const handleTeamChange = useCallback((e) => setTeam(e.currentTarget.value), [])
  const handlePlayerNameChange = useCallback((e) => setPlayerName(e.currentTarget.value), [])
  const handleHeroesChange = useCallback((e) => setHeroes(e.currentTarget.value), [])
  const handleMinReplayChange = useCallback((e) => setMinReplay(e.currentTarget.value), [])
  const handleDescriptionChange = useCallback((e) => setDescription(e.currentTarget.value), [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    setStatus(STATUS.PENDING)

    sendEmail({ type, gameID, division, team, playerName, heroes, minReplay, description })
      .then((response) => {
        if (response.status === 200) {
          setType('')
          setGameID('')
          setDivision('')
          setTeam('')
          setDescription('')
          setHeroes('')
          setPlayerName('')
          setMinReplay('')
          setStatus(STATUS.SUCCESS)
        } else {
          setStatus(STATUS.ERROR)
        }
      })
      .catch((err) => setStatus(STATUS.ERROR))
  }, [type, gameID, division, team, playerName, heroes, minReplay, description])

  const renderStatus = useCallback(() => {
    if (!status) return null
    if (status === STATUS.PENDING) return <div className="lds-hourglass" />
    if (status === STATUS.ERROR)  return <div className="alert alert-danger" role="alert">We were unable to send your data ! 😞</div>
    if (status === STATUS.SUCCESS) return <div className="alert alert-success" role="alert">Data uploaded with success ! 🎉</div>
  }, [status])

  return (
      <Container className="App-container align-items-center justify-content-center">
        <Jumbotron className="">
          <h1 className='display-4'>Submit your Clip for the next Best of FTV League</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="type">Type</FormLabel>
              <input className='form-control' type="text" required id="type" name="type" value={type} onChange={handleTypeChange} placeholder="Rampage / Fail / Save / Juke / Dodge..." autoFocus />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="gameID">Game ID</FormLabel>
              <input className='form-control' type="text" required id="gameID" name="Game ID" value={gameID} onChange={handleGameIDChange} placeholder="123456789 (obligatoire)" />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="division">Division</FormLabel>
              <input className='form-control' type="text" required id="division" name="Division" value={division} onChange={handleDivisionChange} placeholder="d1" />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="team">Teams</FormLabel>
              <input className='form-control' type="text" required id="team" name="Team" value={team} onChange={handleTeamChange} placeholder="The Feeders vs The Masters" />
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
              <FormLabel htmlFor="Description">Description | Clip Twitch</FormLabel>
              <textarea className='form-control' id="description" name="Description" required value={description} onChange={handleDescriptionChange} placeholder="Die like a noob (soyez le plus précis possible ou Clip Twitch)" />
            </FormGroup>
            <FormGroup className="text-center">
              <Button type="submit" className='form-control mb-3' disabled={status === STATUS.PENDING}>Submit</Button>
              {renderStatus()}
            </FormGroup>
          </Form>
        </Jumbotron>
      </Container>
  )
}

export default App
