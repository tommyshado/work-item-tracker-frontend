import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router";


interface AuthContextType {
    login: ({ name, password }: { name: string, password: string }) => Promise<{ success: boolean, message: string }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    axios.interceptors.request.use(function (config) {
        try {
            const token = JSON.parse(localStorage.getItem('token') || '');
            config.headers.Authorization = `Bearer ${token}` // Append token to Authorization header
        } catch (error) {
            console.log("Error parsing token from localStorage:", error);
        }

        return config;
  });

  axios.interceptors.response.use(response => response,
    error => {
      if (error.response && error.response.status == 401) {
        navigate('/');
      }
      return Promise.reject(error);
    });

    async function login({ name, password }: { name: string, password: string }) {
        try {
            const result = await axios.post('/api/auth/login', { Username: name, Password: password });
            const {token} = result.data;
            localStorage.setItem('token', JSON.stringify(token));
            navigate('/work-items');

            return {
                success: true,
                message: 'Login successful.'
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'Login failed. Please check your credentials and try again.'
            }
        }
    }

    return (
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
  return useContext(AuthContext);
};