import axios from "axios"
import { computed, ref } from "vue"

// Composable que maneja la logica de la consulta a la API
export default function useClima () {
    const clima = ref({});
    const cargando = ref(false);
    const error = ref('');

    // Se desgloza el objeto para facilitar la consulta
    const obtenerClima = async ( { ciudad, pais } ) => {
        // Se incia el spinner
        cargando.value = true;
        clima.value = {}
        error.value = '';

        // 1.Importar el APIKey
        const key = import.meta.env.VITE_API_KEY;

        // 2. Obtener latitud y longitud obtenida desde otra API
        let url;

        try {    
            // Si la ciudad incluye el estado 
            if( ciudad.includes(',') ){
                // Se destructura la ciudad delimitado por una "," (un string es un arreglo)
                const [ cd, estado ] = ciudad.split(",");
                
                // Se construye la url incluyendo la key
                url = `http://api.openweathermap.org/geo/1.0/direct?q=${cd},${estado},${pais}&limit=1&appid=${key}`;
            } else {
                url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`;
            }

            // Consultando en la url construida
            const { data } = await axios( url );
            
            // Extrayendo los valores
            const { lat, lon } = data[0];

            // 3. Obteniendo el clima
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
            const { data: resultado } = await axios( urlClima );
            clima.value = resultado;

        } catch {
            error.value = 'Ciudad No Encontrada'
        }
        finally {
            // Se termina el spinner
            cargando.value = false;
        }
    }

    // Si el objeto de clima no tiene valores dentro mandara un false y no se muestra
    // el componte
    const mostrarClima = computed(() => {
        return Object.values( clima.value ).length;
    })

    // convertir los grados a °C (por defecto son Kelvin)
    const formatearTemperatura = temperatura => parseInt( temperatura - 273.15 ); 
    return {
        clima,
        cargando,
        error,
        obtenerClima,
        mostrarClima,
        formatearTemperatura,
    }
}