<template>
    <form class="formulario" @submit.prevent="consultarClima" autocomplete="off">
        <Alerta v-if="error">{{ error }}</Alerta>
        
        <div class="campo">
            <label for="ciudad">Ciudad</label>
            <input 
                type="text"
                id="ciudad"
                placeholder="Ciudad"
                v-model="busqueda.ciudad"
            >
        </div>
        <div class="campo">
            <label for="pais">Ciudad</label>
            <select 
                id="pais"
                v-model="busqueda.pais"
            >
                <option value="">-- Seleccione --</option>
                <option v-for="(pais, index) in paises" :key="index" :value="pais.codigo">{{ pais.nombre }}</option>
            </select>
        </div>

        <input type="submit" value="Consultar Clima">
    </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Alerta from './Alerta.vue'

// Se maneja un custom event obtenido de un composable
const emits = defineEmits([
    'obtener-clima'
])

// State que contendra los datos de entrada a la API
const busqueda = reactive({
    ciudad: '',
    pais: ''
})

const error = ref('');

// Opciones del select
const paises = [
    { codigo: 'US', nombre: 'Estados Unidos' },
    { codigo: 'MX', nombre: 'México' },
    { codigo: 'AR', nombre: 'Argentina' },
    { codigo: 'CO', nombre: 'Colombia' },
    { codigo: 'CR', nombre: 'Costa Rica' },
    { codigo: 'ES', nombre: 'España' },
    { codigo: 'PE', nombre: 'Perú' }
]

const consultarClima = () => {
    if( Object.values( busqueda ).includes('') ) {
        error.value = 'Todos los campos son obligatorios';
        return
    }

    error.value = '';

    // Se envia el objeto completo hacia el composable
    emits('obtener-clima', busqueda);
}
</script>

<style>
.formulario option {
    color: black;
}
</style>