import { account } from "./appwriteConfig";

// Sign up
export const signUp = async (email, password, name) => {
  return await account.create('unique()', email, password, name);
};

// Login
export const login = async (email, password) => {
  return await account.createEmailSession(email, password);
};

// Logout
export const logout = async () => {
  return await account.deleteSession('current');
};

// Get current user
export const getCurrentUser = async () => {
  return await account.get();
};
