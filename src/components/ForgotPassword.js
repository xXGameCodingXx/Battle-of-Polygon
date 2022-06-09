import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UseAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = UseAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function HandleSubmit(e) {
        e.preventDefault()
        
        setMessage("")
        setError("")
        setLoading(true)
        const result = await resetPassword(emailRef.current.value)
        if (typeof result === "string") setError(result)
        setMessage("Check your inbox for further instructions")
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    { error && <Alert variant="danger">{error}</Alert> }
                    { message && <Alert variant="success" className="text-center">{message}</Alert> }
                    <Form onSubmit={HandleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref ={emailRef} required />
                        </Form.Group>
                        <br></br>
                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account ? <Link to="/register">Register</Link>
            </div>
        </>
    )
}