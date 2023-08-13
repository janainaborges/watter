<script>
    let volumeDiario = 2000; 
    let pausasDiarias = 10;  
    let horarioInicio = "08:00";  
    let horarioFim = "20:00";  

    export function salvarConfiguracoes() {
        return {
            volumeDiario,
            pausasDiarias,
            horarioInicio,
            horarioFim
        };
    }
</script>

<style>
    .config-section {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 10px;
    }
</style>

<div class="container">
    <h2>Configurações</h2>

    <div class="config-section">
        <label for="volumeDiario">Volume Diário de Água (ml):</label>
        <input type="number" id="volumeDiario" bind:value={volumeDiario} />
    </div>

    <div class="config-section">
        <label for="pausasDiarias">Número Diário de Pausas:</label>
        <input type="number" id="pausasDiarias" bind:value={pausasDiarias} />
    </div>

    <div class="config-section">
        <label for="horarioInicio">Horário de Início das Notificações:</label>
        <input type="time" id="horarioInicio" bind:value={horarioInicio} />
    </div>

    <div class="config-section">
        <label for="horarioFim">Horário de Término das Notificações:</label>
        <input type="time" id="horarioFim" bind:value={horarioFim} />
    </div>

    <button on:click={salvarConfiguracoes}>Salvar Configurações</button>
</div>
