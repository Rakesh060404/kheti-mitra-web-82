import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    // Example: check for a token in localStorage
    return !!localStorage.getItem('authToken');
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;