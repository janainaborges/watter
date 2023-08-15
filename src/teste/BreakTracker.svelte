<script lang="ts">
  import { onMount } from "svelte";
  import ProgressBar from "../components/ProgressBar.svelte";
  import { totalBreaks, dailyBreakGoal, saveToStorage, getFromStorage } from "./store";
  
  function takeBreak() {
      totalBreaks.update((n) => {
          const newTotal = n + 1;
          saveToStorage('totalBreaks', newTotal);
          return newTotal;
      });
  }
  
  onMount(() => {
      const storedBreaks = getFromStorage('totalBreaks');
  
      if (storedBreaks) {
          totalBreaks.set(Number(storedBreaks));
      }
  });
  </script>
  
  <div class="container">
    <h2>Registro de Pausas</h2>
    <ProgressBar percentage={($totalBreaks / $dailyBreakGoal) * 100} />
    <button on:click={takeBreak}>Registrar Pausa</button>
    <h3>Total de pausas hoje: {$totalBreaks}</h3>
    <p>
      Você fez {($totalBreaks / $dailyBreakGoal) * 100}% das pausas recomendadas!
    </p>
  </div>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      place-items: center;
    }
  </style>
  