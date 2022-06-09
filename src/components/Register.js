import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UseAuth } from '../contexts/AuthContext'

export default function Register() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { register } = UseAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function HandleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) return setError("Passwords do not match !")
        
        setError("")
        setLoading(true)
        const result = await register(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
        if (typeof result === "string") setError(result)
        else navigate("/")
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
                    { error && <Alert variant="danger">{error}</Alert> }
                    <Form onSubmit={HandleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" ref ={usernameRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref ={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref ={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirme">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref ={passwordConfirmRef} required />
                        </Form.Group>
                        <br></br>
                        <Button disabled={loading} className="w-100" type="submit">Register</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account ? <Link to="/login">Login</Link>
            </div>
        </>
    )
}