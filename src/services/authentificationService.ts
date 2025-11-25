export interface User {
    id: number;
    email: string;
    password: string;
}

export default class AuthentificationService {
    static isAuthenticated: boolean = false;
    private static readonly API_URL = 'https://www.pokemons-pierre.mmi-stdie.fr/pokemon_backend/public'; // URL du backend Symfony

    // Méthode pour obtenir le token stocké
    static getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    // Méthode pour vérifier si l'utilisateur est authentifié
    static isUserAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null && token !== '';
    }
    static getUserInfo(): User | null {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    }
    static async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
        try {
            const response = await fetch(`${this.API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return {
                    success: false,
                    message: errorData.message || 'Identifiants incorrects'
                };
            }

            const data = await response.json();
            
            if (data.token) {
                // Stocker le token JWT
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userInfo', JSON.stringify({ email })); 
                return { success: true };
            } else {
                return {
                    success: false,
                    message: 'Token non reçu du serveur'
                };
            }
        } catch (error) {
            console.error('Erreur d\'authentification:', error);
            return {
                success: false,
                message: 'Erreur de connexion au serveur'
            };
        }
    }

    static logout(): void {
        this.isAuthenticated = false;
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userInfo');
    }

    // Méthode pour faire des requêtes authentifiées
    static async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
        const token = this.getToken();
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };

        const mergedOptions: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        };

        return fetch(url, mergedOptions);
    }

    static getCurrentUserId(): number | null {
        const userId = localStorage.getItem('userId');
        return userId ? parseInt(userId, 10) : null;
    }
}