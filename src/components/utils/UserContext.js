import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    IdUser: "",
    Email: "",
    Password: "",
    UserName: "",
    Description: "",
    FirstName: "",
    LastName: "",
    BirthDate: "",
    Phone: "",
    ProfileImage: "",
    Latitude: "",
    Longitude: "",
  });

  const setUserInfo = ({
    IdUser,
    Email,
    Password,
    UserName,
    Description,
    FirstName,
    LastName,
    BirthDate,
    Phone,
    ProfileImage,
    Latitude,
    Longitude
  }) => {
    setUserData({
      ...userData,
      IdUser,
      Email,
      Password,
      UserName,
      Description,
      FirstName,
      LastName,
      BirthDate,
      Phone,
      ProfileImage,
      Latitude,
      Longitude
    });
  };

  return (
    <UserContext.Provider value={{ userData, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export const setUserData = (data) => {
  setUserInfo(data);
};
