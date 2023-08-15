<script lang="ts">
  import { onMount } from "svelte";
  import { clearStorage } from './store';

  import {
    dailyWaterGoal,
    dailyBreakGoal,
    saveToStorage,
    getFromStorage,
  } from "./store";

  let newDailyWaterGoal: number;
  let newDailyBreakGoal: number;

  function handleClearCache() {
        clearStorage();
        // Optionally, you can reset the local component state here if needed.
        alert('Cache limpo com sucesso!');
    }

  onMount(() => {
    newDailyWaterGoal =
      Number(getFromStorage("dailyWaterGoal")) || $dailyWaterGoal;
    newDailyBreakGoal =
      Number(getFromStorage("dailyBreakGoal")) || $dailyBreakGoal;
  });

  function updateGoal(goalType: "water" | "break", value: number) {
    if (value !== undefined && value > 0) {
      if (goalType === "water") {
        dailyWaterGoal.set(value);
        saveToStorage("dailyWaterGoal", value);
      } else {
        dailyBreakGoal.set(value);
        saveToStorage("dailyBreakGoal", value);
      }
      alert("Meta atualizada com sucesso!");
    } else {
      alert("Por favor, insira um valor válido.");
    }
  }
</script>

<div class="container">
  <h2>Configurações Diárias</h2>
  <label>Meta diária de água (ml):</label>
  <input
    type="number"
    bind:value={newDailyWaterGoal}
    placeholder={$dailyWaterGoal.toString()}
  />
  <button on:click={() => updateGoal("water", newDailyWaterGoal)}
    >Atualizar Meta de Água</button
  >

  <label>Meta diária de pausas:</label>
  <input
    type="number"
    bind:value={newDailyBreakGoal}
    placeholder={$dailyBreakGoal.toString()}
  />
  <button on:click={() => updateGoal("break", newDailyBreakGoal)}
    >Atualizar Meta de Pausas</button
  >
  <button on:click={handleClearCache}>Limpar Cache</button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  label {
    margin-top: 10px;
  }
</style>
