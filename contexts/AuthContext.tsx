/*
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userName: string | null;
  setUserName: (name: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
*/
/*
// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { name: string; email: string } | null;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const setUserName = (name: string) => {
    setUser(prevUser => ({ ...prevUser, name } as { name: string; email: string }));
  };

  const setUserEmail = (email: string) => {
    setUser(prevUser => ({ ...prevUser, email } as { name: string; email: string }));
  };

  console.log('AuthProvider User:', user);

  return (
    <AuthContext.Provider value={{ user, setUserName, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
*/

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: { name: string; email: string } | null;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const setUserName = (name: string) => {
    setUser(prevUser => {
      const updatedUser = prevUser ? { ...prevUser, name } : { name, email: '' };
      console.log('Updated user name: ', updatedUser);
      return updatedUser;
    });
  };

  const setUserEmail = (email: string) => {
    setUser(prevUser => {
      const updatedUser = prevUser ? { ...prevUser, email } : { name: '', email };
      console.log('Updated user email:', updatedUser);
      return updatedUser;
    });
  };

  useEffect(() => {
    console.log('AuthProvider User:', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUserName, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

