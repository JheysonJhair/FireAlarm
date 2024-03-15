import axios from "axios";

//Login
export const loginUser = async (email, password) => {
  try {
    const response = await fetch("https://dizzgob.ccontrolz.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

//Registrar
export const registerUser = async ({
  Email,
  Password,
  FirstName,
  LastName,
  Phone,
}) => {
  try {
    const response = await axios.post(
      "https://dizzgob.ccontrolz.com/user/insert",
      {
        Email,
        Password,
        FirstName,
        LastName,
        Phone,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

