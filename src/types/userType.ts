export interface UserType {
    _id: string;
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    about?: string;
    authToken?: string | undefined;
    iat: number;
  exp: number;
  avatar?: string;
  
  
  }
  