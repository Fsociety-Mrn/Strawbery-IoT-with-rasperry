import { Navigate } from 'react-router-dom';
import { useAuth } from '../LoginFirebase'
const AuthenticationLogin = ({ children }) => {
    const user  = useAuth()
    if (user) {
        return children;
        
      }
    return <Navigate to='/Login' />;
}

export default AuthenticationLogin