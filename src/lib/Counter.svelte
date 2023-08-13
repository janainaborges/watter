<script>
  let volumeDiario = 2000; 
  let horarioInicio = "08:00";
  let horarioFim = "20:00";
</script>

<h1>Configurações</h1>

<h2>Volume Diário de Água: {volumeDiario}ml</h2>
<input type="number" bind:value={volumeDiario} />

<h2>Horário Ativo: {horarioInicio} - {horarioFim}</h2>
<input type="time" bind:value={horarioInicio} />
<input type="time" bind:value={horarioFim} />
