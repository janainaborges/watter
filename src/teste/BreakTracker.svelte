<script lang="ts">
  import { totalBreaks, dailyBreakGoal } from './store.js';

  function takeBreak() {
    totalBreaks.update(n => n + 1);
  }
</script>

<h2>Registro de Pausas</h2>
<button on:click={takeBreak}>Registrar Pausa</button>
<h3>Total de pausas hoje: {$totalBreaks}</h3>
<p>Você fez {($totalBreaks / $dailyBreakGoal) * 100}% das pausas recomendadas!</p>

<!-- Barra de progresso (exemplo básico) -->
<div class="progress-bar">
  <div class="progress" style="width: {($totalBreaks / $dailyBreakGoal) * 100}%"></div>
</div>

<style>
  .progress-bar {
    width: 100%;
    height: 20px;
    background-color: #e0e0e0;
  }

  .progress {
    height: 100%;
    background-color: #ff9800;
  }
</style>
