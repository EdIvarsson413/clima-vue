<template>
    <div class="resultado">
        <h2 class="">Clima de: {{ clima.name }}</h2>
        <p class="actual">{{ formatearTemperatura( clima.main.temp ) }}&deg;C</p>
        <div class="temperaturas">
            <p>
                Min: {{ formatearTemperatura( clima.main.temp_min ) }}
                <span>&deg;C</span>
            </p>
            <p>
                Max: {{ formatearTemperatura( clima.main.temp_max ) }}
                <span>&deg;C</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import useClima from '../composables/useClima'

// Solo se trae la función y no todo el state (si se hace se pierde el resultado)
const { formatearTemperatura } = useClima();

defineProps({
    clima: {
        type: Object,
        required: true
    }
})
</script>