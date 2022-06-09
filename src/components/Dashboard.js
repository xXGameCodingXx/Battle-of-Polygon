import { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UseAuth } from '../contexts/AuthContext'

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = UseAuth()
    const navigate = useNavigate()

    async function HandleLogout() {
        try {
            setError("")
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to logout")
        }
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                { error && <Alert variant="danger">{error}</Alert> }
                <strong>Username:</strong> { currentUser.displayName }
                <br></br>
                <strong>Email:</strong> { currentUser.email }
                <br></br>
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3" >Update Profile</Link>
            </Card.Body>
        </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={HandleLogout}>Log Out</Button>
            </div>
        </>
    )
}