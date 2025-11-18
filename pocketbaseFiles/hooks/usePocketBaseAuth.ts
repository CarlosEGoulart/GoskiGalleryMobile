
import { usePocketBaseStore } from '../stores/usePocketBaseStore';

const pocketbaseUrl = 'https://8090-firebase-goskigallerymobile-1758814611804.cluster-mdgxqvvkkbfpqrfigfiuugu5pk.cloudworkstations.dev';

export const usePocketBaseAuth = () => {
    const { pocketBase, setUser } = usePocketBaseStore();
    
    const login = async (loginData: any) => {
        try {
            const { email, password } = loginData;
            const response = await fetch(`${pocketbaseUrl}/api/collections/artists/auth-with-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to authenticate.');
            }
            
            // Manually update the store after successful login
            pocketBase.authStore.save(data.token, data.record);

        } catch (err) {
            console.log('Error during login:', err);
            throw err;
        }
    };

    const logout = () => {
        pocketBase.authStore.clear();
    };

    const registerUser = async (registrationData: any) => {
        try {
            const { email, password, name, bio } = registrationData;
            const response = await fetch(`${pocketbaseUrl}/api/collections/artists/records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    passwordConfirm: password,
                    name,
                    bio,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create record.');
            }

            await login({ email, password });

        } catch (err) {
            console.log('Error during registration:', err);
            throw err;
        }
    };

    return { login, logout, registerUser };
};

export default usePocketBaseAuth;
