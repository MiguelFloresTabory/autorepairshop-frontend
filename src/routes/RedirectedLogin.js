

import { Navigate } from 'react-router-dom';

const RedirectLogin = () => {
    return <Navigate to={{pathname: "/login"}} />
}
export default RedirectLogin;