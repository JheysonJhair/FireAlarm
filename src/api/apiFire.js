export const fetchNotify = async () => {
  try {
    const response = await fetch(
      "https://satlled.ccontrolz.com/satelite/conflagration"
    );
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
