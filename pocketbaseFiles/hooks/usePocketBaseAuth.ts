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

    const registerUser = async (registrationData: { email: string, password: string, passwordConfirm: string, name: string, bio: string }) => {
        try {
            const dataToCreate = {
                email: registrationData.email,
                password: registrationData.password,
                passwordConfirm: registrationData.passwordConfirm,
                name: registrationData.name,
                bio: registrationData.bio,
            };

            await pocketBase.collection('artists').create(dataToCreate);
            await login({ email: registrationData.email, password: registrationData.password });

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