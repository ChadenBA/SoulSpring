import { ConfigEnv } from '@config/configEnv';
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum';
import * as CryptoJS from 'crypto-js';
import { Professional } from 'types/models/Prof';
import { User } from 'types/models/User';

//___________________get secret key from environment variables___________________
const secretKey = ConfigEnv.HASH_KEY;

if (!secretKey) {
  throw new Error('SECRET_KEY is not defined in environment variables');
}

//___________________encrypt and decrypt___________________
const encrypt = (data: string) => {
  try {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (error) {
    console.error("Error during encryption:", error);
    throw error;
  }
};

const decrypt = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      throw new Error('Decryption failed or the data might be corrupted');
    }
    
    return decryptedData;
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

//___________________get from local storage___________________
export const getFromLocalStorage = (key: LocalStorageKeysEnum, isObject?: boolean) => {
  const localStorageValue = localStorage.getItem(key);

  if (!localStorageValue) {
    console.warn(`No data found in localStorage for key: ${key}`);
    return null;
  }

  //console.log('Encrypted value from localStorage:', localStorageValue); // Log the encrypted value

  const decryptedValue = decrypt(localStorageValue);

  if (!decryptedValue) {
    console.error(`Decryption failed for key: ${key}`);
    return null;
  }

  try {
    return isObject ? JSON.parse(decryptedValue) : decryptedValue;
  } catch (error) {
    console.error(`Failed to parse decrypted value for key: ${key}`, error);
    return null;
  }
};

//___________________set to local storage___________________
export const setToLocalStorage = (key: LocalStorageKeysEnum, value: string, isObject?: boolean) => {
  try {
    const valueToStore = isObject ? JSON.stringify(value) : value;
    const cryptedValue = encrypt(valueToStore);
    localStorage.setItem(key, cryptedValue);
  } catch (error) {
    console.error('Error during setting to localStorage:', error);
  }
};

//___________________get user from local storage___________________
export const getUserFromLocalStorage = (): User | null => {
  const user = getFromLocalStorage(LocalStorageKeysEnum.User, false);

  if (user) {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return null;
    }
  }
  return null;
};


//___________________get Pro from local storage___________________
export const getProFromLocalStorage = (): Professional | null => {
  const professional = getFromLocalStorage(LocalStorageKeysEnum.professional, false);

  if (professional) {
    try {
      return JSON.parse(professional);
    } catch (error) {
      console.error("Failed to parse professional data from localStorage", error);
      return null;
    }
  }
  return null;
};


//___________________remove from local storage___________________
export const removeFromLocalStorage = (key: LocalStorageKeysEnum) => {
  try {
    localStorage.removeItem(key);
    console.log(`Item removed from localStorage: ${key}`);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

// ___________________save language to local storage___________________
export const saveLanguageToLocalStorage = (language: string) => {
  setToLocalStorage(LocalStorageKeysEnum.Language, language);
};

//___________________get language from local storage___________________
export const getLanguageFromLocalStorage = () => {
  return getFromLocalStorage(LocalStorageKeysEnum.Language, false);
};



//------------------clear local storage------------------//
export const clearLocalStorage = () => {
  try {
    // Store hasCompletedTest before clearing everything
    const hasCompletedTest = localStorage.getItem(LocalStorageKeysEnum.HasCompletedTest);

    // Clear all data except language and hasCompletedTest
    const language = getLanguageFromLocalStorage();
    localStorage.clear();

    // Restore hasCompletedTest
    if (hasCompletedTest) {
      localStorage.setItem(LocalStorageKeysEnum.HasCompletedTest, hasCompletedTest);
    }

    saveLanguageToLocalStorage(language);

    console.log('LocalStorage cleared, language saved, and test completion status preserved.');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
