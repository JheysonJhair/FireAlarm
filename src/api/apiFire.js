export const fetchNotify = async () => {
  try {
    const response = await fetch(
      "https://firealarm.ccontrolz.com/mensaje/getall"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const deleteMensaje = async (id) => {
  try {
    const response = await fetch(
      `https://firealarm.ccontrolz.com/mensaje/delete?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Mensaje eliminado exitosamente");
    } else {
      throw new Error("Error al eliminar el mensaje");
    }
  } catch (error) {
    console.error("Error al eliminar el mensaje:", error);
  }
};

export const updateMensaje = async (idMensaje, estado) => {
  try {
    const response = await fetch(
      "https://firealarm.ccontrolz.com/mensaje/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdMensaje: idMensaje,
          Estado: estado,
        }),
      }
    );

    if (response.ok) {
      console.log("Mensaje actualizado exitosamente");
    } else {
      throw new Error("Error al actualizar el mensaje");
    }
  } catch (error) {
    console.error("Error al actualizar el mensaje:", error);
  }
};
