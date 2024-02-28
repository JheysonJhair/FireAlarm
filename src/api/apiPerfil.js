//Actualizar perfil
export const updateProfile = async (formData) => {
  try {
    const response = await fetch(`https://dizzgob.ccontrolz.com/user/updateUser`, {
      method: "PUT", 
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error en la solicitud actualizar perfil" };
  }
};

//Actualizar imagen de perfil
export const updateProfileImage = async (userId, formData) => {
  try {
    const response = await fetch(`https://dizzgob.ccontrolz.com/user/updateImageProfile/${userId}`, {
      method: "PUT", 
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Error en la solicitud actualizar imagen perfil" };
  }
};
