//Productos más vendidos
export const getBestSellers = async (cantidad) => {
  try {
    const products = await fetch(
      `https://dizzgob.ccontrolz.com/products/BestSelling/${cantidad}`
    );

    if (!products.ok) {
      throw new Error(`Error en la solicitud: ${products.statusText}`);
    }

    const data = await products.json();

    if (Array.isArray(data.value)) {
      return { success: true, data: data.value };
    } else {
      throw new Error(
        "La respuesta de la API no contiene un arreglo de productos."
      );
    }
  } catch (error) {
    console.error(
      "Error al obtener los productos mas vendidos:",
      error.message
    );
    return { success: false, error: error.message };
  }
};

//Productos recomendados
export const getRecommended = async (cantidad) => {
  try {
    const products = await fetch(
      `https://dizzgob.ccontrolz.com/products/BestRecommended/${cantidad}`
    );

    if (!products.ok) {
      throw new Error(`Error en la solicitud: ${products.statusText}`);
    }

    const data = await products.json();

    if (Array.isArray(data.value)) {
      return { success: true, data: data.value };
    } else {
      throw new Error(
        "La respuesta de la API no contiene un arreglo de productos."
      );
    }
  } catch (error) {
    console.error(
      "Error al obtener los productos recomendados:",
      error.message
    );
    return { success: false, error: error.message };
  }
};

//Arma tu propia fiesta
export const getPartyWeapon = async (cantidad) => {
  try {
    const products = await fetch(
      `https://dizzgob.ccontrolz.com/products/partyweapon/${cantidad}`
    );

    if (!products.ok) {
      throw new Error(`Error en la solicitud: ${products.statusText}`);
    }

    const data = await products.json();

    if (Array.isArray(data.value)) {
      return { success: true, data: data.value };
    } else {
      throw new Error(
        "La respuesta de la API no contiene un arreglo de productos."
      );
    }
  } catch (error) {
    console.error(
      "Error al obtener los productos de tu propia fiesta:",
      error.message
    );
    return { success: false, error: error.message };
  }
};

// Filtro por tipo de bebida
export const getFiltradoTipoBebida = async (cantidad, tipo) => {
  try {
    const products = await fetch(
      `https://dizzgob.ccontrolz.com/products/Type/${cantidad}/${tipo}`
    );

    if (!products.ok) {
      throw new Error(`Error en la solicitud: ${products.statusText}`);
    }

    const data = await products.json();
    if (Array.isArray(data.value)) {
      return { success: true, data: data.value };
    } else {
      throw new Error(
        "La respuesta de la API no contiene un arreglo de productos."
      );
    }
  } catch (error) {
    console.error("Error al obtener los el filtrado:", error.message);
    return { success: false, error: error.message };
  }
};
