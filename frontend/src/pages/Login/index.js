import React, { useState } from 'react'
import api from '../../services/api'
import './style.css'

import logo from '../../assets/logo.svg'

export default function Login ({ history }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    setIsDisabled(true)
    try {
      const response = await api.post('/dev', { username })
      history.push(`/dev/${response.data._id}`)
      setError('')
    } catch (err) {
      setError('Usuário não possui conta no github')
    }
    setIsDisabled(false)
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite o nome do seu usuário do Github"
          value={username}
          onChange={ e => setUsername(e.target.value) }
          disabled={isDisabled}
          />
          { error && <small className="error-message">{ error }</small> }
        <button>Enviar</button>
      </form>
    </div>
  )
}