import React, { useState, createContext, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
/** App constants */
import { AUTH_USER_TOKEN_KEY } from '../utils/constants';

export const UserContext = createContext({} as UserContextProps);

interface UserContextProps {
  user: UserProps;
  error: string;
  signUp: (username: string, password: string, email: string) => {};
  confirmSignUp: (code: string, username: string) => {};
  signIn: (username: string, password: string) => {};
  signOut(): Promise<any>;
}

interface UserProps {
  username: string;
}

interface Props {
  children?: React.ReactNode;
}

function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserProps>({
    username: '',
  });
  const [error, setError] = useState('');

  async function signUp(username: string, password: string, email: string) {
    return await new Promise((resolve, reject) => {
      const newUser = Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      })
        .then(function (data) {
          // @ts-ignore
          setUser(data.user);
          resolve(data);
        })
        .catch(function (err) {
          switch (err.name) {
            case 'InvalidParameterException':
              setError('Email address invalid.');
              reject(err);
              break;
            case 'InvalidPasswordException':
              setError(
                'Password needs to be minimum 8 characters with at least one symbol, numberical and uppercase characters'
              );
              reject(err);
              break;
            case 'UsernameExistsException':
              setError('Email/Username already exists.');
              reject(err);
              break;
            default:
              setError(err.message);
              reject(err);
          }
        });
    });
  }

  async function confirmSignUp(username: string, code: string) {
    return await new Promise((resolve, reject) => {
      Auth.confirmSignUp(username, code)
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          setError(err.message);
          reject(err);
        });
    });
  }

  async function signIn(username: string, password: string) {
    return await new Promise((resolve, reject) => {
      Auth.signIn(username, password)
        .then(function (data) {
          localStorage.setItem(
            AUTH_USER_TOKEN_KEY,
            data.signInUserSession.accessToken.jwtToken
          );
          setUser(data);
          resolve(data);
        })
        .catch(function (err) {
          setError(err.message);
          reject(err);
        });
    });
  }

  useEffect(() => {
    setError('');
  }, [user]);

  const signOut = async (): Promise<any> => {
    try {
      await Auth.signOut();
      // @ts-ignore
      setUser('');
      localStorage.clear();
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    }
  };

  const getSession = (): Promise<CognitoUserSession | null> =>
    Auth.currentSession();

  return (
    <UserContext.Provider
      value={{ user, signUp, confirmSignUp, error, signIn, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
