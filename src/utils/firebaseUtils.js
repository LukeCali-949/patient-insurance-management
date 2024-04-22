import { getAuth, signOut } from 'firebase/auth';


const auth = getAuth();

const handleSignOut = async () => {
  try {
    await signOut(auth);
    
    console.log('User signed out');
    
  } catch (error) {
    
    console.error('Error signing out:', error);
  }
};