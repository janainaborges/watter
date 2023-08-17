<script lang="ts">
  import { onMount } from "svelte";
  import ProgressBar from "../components/ProgressBar.svelte";
  import {
    totalBreaks,
    dailyBreakGoal,
    saveToStorage,
    getFromStorage,
    addToHistory,
  } from "../stores/store";
  import ButtonComponent from "../components/ButtonComponent.svelte";
  import "../styles/stylePages/break.style.css";

  function takeBreak() {
    totalBreaks.update((n) => {
        saveToStorage("totalBreaks", n + 1);
        addToHistory("break");
        return n + 1;
    });
  }

  onMount(() => {
    const storedBreaks = getFromStorage("totalBreaks");

    if (storedBreaks) {
      totalBreaks.set(Number(storedBreaks));
    }
  });

  $: percentageBreaks = ($totalBreaks / $dailyBreakGoal) * 100;
  $: breakMessage = percentageBreaks >= 100 
      ? `Você passou ${percentageBreaks - 100}% da sua meta diária de pausas!`
      : `Você fez ${percentageBreaks}% das pausas recomendadas!`;

</script>

<div class="app-container">
  <h2>Registro de Pausas</h2>
  <ProgressBar percentage={percentageBreaks} />
  <div class="content">
    <ButtonComponent label="Registrar Pausa" onClick={takeBreak} />
  </div>

  <h3>Total de pausas hoje: {$totalBreaks}</h3>
  <p>
    {breakMessage}
  </p>
</div>
