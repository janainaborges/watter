<script lang="ts">
  import { onMount } from "svelte";
  import ProgressBar from "../components/ProgressBar.svelte";
  import {
    totalBreaks,
    dailyBreakGoal,
    saveToStorage,
    getFromStorage,
    addToHistory,
  } from "./store";
  import ButtonComponent from "../components/ButtonComponent.svelte";

  function takeBreak() {
    totalBreaks.update((n) => {
      totalBreaks.update((n) => n + 1);
        saveToStorage("totalBreaks", 1);
        return 1;
    });
    addToHistory("break");  
}



  onMount(() => {
    const storedBreaks = getFromStorage("totalBreaks");

    if (storedBreaks) {
      totalBreaks.set(Number(storedBreaks));
    }
  });
</script>

<div class="container">
  <h2>Registro de Pausas</h2>
  <ProgressBar percentage={($totalBreaks / $dailyBreakGoal) * 100} />
  <ButtonComponent label="Registrar Pausa" onClick={takeBreak} />

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
