import axios from "axios";

async function getPruebas() {
    try {
        const response = await axios.get("http://localhost:8000/api/pruebas/");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las pruebas:", error);
        return [];
    }
}

export { getPruebas };