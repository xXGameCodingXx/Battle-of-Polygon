import Register from "./Register";
import { Container } from "react-bootstrap";
import { AuthProvider, UseAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
    const PrivateRoute = () => {
        const { currentUser } = UseAuth()
        return currentUser ? <Outlet /> : <Navigate to="/login" />
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "20.833vw" }}>
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route exact path="/" element={<PrivateRoute />}>
                                <Route exact path="/" element={<Dashboard />} />
                            </Route>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/update-profile" element={<PrivateRoute />}>
                                <Route path="/update-profile" element={<UpdateProfile />} />
                            </Route>
                        </Routes>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    )
}

export default App;