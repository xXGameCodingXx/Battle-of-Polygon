import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UseAuth } from '../contexts/AuthContext'

export default function UpdateProfile() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser } = UseAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function HandleSubmit(e) {
        // e.preventDefault()
        // if (passwordRef.current.value !== passwordConfirmRef.current.value) return setError("Passwords do not match !")
        
        // setError("")
        // setLoading(true)
        // const result = await register(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
        // if (typeof result === "string") setError(result)
        // else navigate("/")
        // setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    { error && <Alert variant="danger">{error}</Alert> }
                    <Form onSubmit={HandleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>New Username</Form.Label>
                            <Form.Control type="text" ref ={usernameRef} required defaultValue={currentUser.displayName} />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>New Email</Form.Label>
                            <Form.Control type="email" ref ={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" ref ={passwordRef} required placeholder="Leave blank to keep the same password" />
                        </Form.Group>
                        <Form.Group id="password-confirme">
                            <Form.Label>New Password Confirmation</Form.Label>
                            <Form.Control type="password" ref ={passwordConfirmRef} required placeholder="Leave blank to keep the same password" />
                        </Form.Group>
                        <br></br>
                        <Button disabled={loading} className="w-100" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}