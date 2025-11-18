import { usePocketBaseStore } from '../stores/usePocketBaseStore';
import PocketBase, { ClientResponseError } from 'pocketbase';

export const usePocketBaseAuth = () => {
    const { pocketBase } = usePocketBaseStore();
    
    const login = async (loginData: any) => {
        try {
            const { email, password } = loginData;
            
            await pocketBase.collection('artists').authWithPassword(email, password);

        } catch (err) {
            if (err instanceof ClientResponseError) {
                console.log('PocketBase Error during login:', err.response);
            } else {
                console.log('Error during login:', err);
            }
            throw err;
        }
    };

    const logout = () => {
        pocketBase.authStore.clear();
    };

    const registerUser = async (registrationData: any) => {
        try {
            const { email, password, name, bio } = registrationData;
            
            const userData = {
                email,
                password,
                passwordConfirm: password,
                name,
                bio,
            };


            await pocketBase.collection('artists').create(userData);
            await login({ email, password });

        } catch (err) {
            if (err instanceof ClientResponseError) {
                console.log('PocketBase Error during registration:', err.response);
            } else {
                console.log('Error during registration:', err);
            }
            throw err;
        }
    };

    return { login, logout, registerUser };
};

export default usePocketBaseAuth;