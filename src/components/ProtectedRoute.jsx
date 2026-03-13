// FILE: ProtectedRoute.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\components\ProtectedRoute.jsx
// PURPOSE: Blocks access to pages if not logged in. Redirects to home page.
 
import { Navigate } from 'react-router-dom';
 
export default function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}