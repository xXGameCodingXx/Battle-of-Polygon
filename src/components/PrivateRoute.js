import { Route, Navigate  } from 'react-router-dom'
import { UseAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = UseAuth()

    return (
        <Route {...rest}  element={props => {
            return currentUser ? <Component {...props} /> : <Navigate to="/login" />
        }}></Route>
    )
}