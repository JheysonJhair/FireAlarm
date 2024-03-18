export const registerIncendio = async (formData) => {
    try {
        const response = await fetch(`https://firealarm.ccontrolz.com/mensaje/insert`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            return { success: true, data: responseData };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.msg || "Error desconocido en la solicitud de inserción de incendio" };
        }
    } catch (error) {
        console.error("Error:", error);
        return { success: false, error: "Error en la solicitud de inserción de incendio" };
    }
};
