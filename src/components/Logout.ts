import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/authentificationService';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                AuthenticationService.logout();
                
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } catch (error) {
                console.error('Erreur lors de la déconnexion:', error);
            }
        };

        logout();
    }, [navigate]);

    return ('<div>Déconnexion...</div>')
    
};
export default Logout;