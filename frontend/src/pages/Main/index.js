import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import api from '../../services/api'
import './style.css'

export default function Main ({ match }) {
  const [users, setUsers] = useState([])
  useEffect(()=> {

    async function loadUsers () {
      try{
        const response = await api.get('/dev', {
          headers: {
            user: match.params.id
          }
        })
        setUsers(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    loadUsers()
  }, [match.params.id])


  async function handleLike (id) {
    await api.post(`/dev/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    })

    setUsers(users.filter(user => user._id !== id ))
  }

  async function handleDislike (id) {
    await api.post(`/dev/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    })

    setUsers(users.filter(user => user._id !== id ))
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>

      <ul>
        { users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt="avatar" />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>
            <div className="buttons">
              <button type="button" onClick={ () => handleDislike(user._id) }>
                <img src={dislike} alt="dislike" />
              </button>
              <button type="button" onClick={() => handleLike(user._id)}>
                <img src={like} alt="like" />
              </button>
            </div>
          </li>
        )) }
      </ul>
    </div>
  )
}