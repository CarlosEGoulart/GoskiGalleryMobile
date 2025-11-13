import { usePocketBaseStore } from '@/pocketbase/stores/usePocketBaseStore';

const usePocketBaseAuth = () => {
  const { pocketBase } = usePocketBaseStore();

  const login = async (email, password) => {
    await pocketBase.collection('users').authWithPassword(email, password);
  };

  const logout = () => {
    pocketBase.authStore.clear();
  };

  const registerUser = async (email, password, passwordConfirm, name, bio) => {
    await pocketBase.collection('users').create({
      email,
      password,
      passwordConfirm,
      name,
      bio,
    });
    // After creation, PocketBase automatically authenticates the new user.
    // The authStore listener in usePocketBaseStore will update the user state.
  };

  return { login, logout, registerUser };
};

export default usePocketBaseAuth;
