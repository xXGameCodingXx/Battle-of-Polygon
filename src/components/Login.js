import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UseAuth } from '../contexts/AuthContext'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = UseAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function HandleSubmit(e) {
        e.preventDefault()
        
        setError("")
        setLoading(true)
        const result = await login(emailRef.current.value, passwordRef.current.value)
        if (typeof result === "string") setError(result)
        else navigate("/")
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    { error && <Alert variant="danger">{error}</Alert> }
                    <Form onSubmit={HandleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref ={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref ={passwordRef} required />
                        </Form.Group>
                        <br></br>
                        <Button disabled={loading} className="w-100" type="submit">Login</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">Forgot Password ?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account ? <Link to="/register">Register</Link>
            </div>
        </>
    )
}