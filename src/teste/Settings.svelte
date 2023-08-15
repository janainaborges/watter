<script lang="ts">
  import { onMount } from "svelte";
  import { clearStorage, totalWater } from "./store";

  import {
    dailyWaterGoal,
    dailyBreakGoal,
    saveToStorage,
    getFromStorage,
  } from "./store";
  import { scheduleBreakNotifications, scheduleWaterNotifications } from "../components/notificationManager";

  let newDailyWaterGoal: number;
  let newDailyBreakGoal: number;

  function handleClearCache() {
    clearStorage();
    // Optionally, you can reset the local component state here if needed.
    alert("Cache limpo com sucesso!");
  }

  let waterInput = 0;
  let isKeyboardVisible = false;
  let startTime: string;
  let endTime: string;
  let waterNotificationInterval = 15; // Default to 15 minutes
  let breakNotificationInterval = 30; // Default to 30 minutes

  function addWater() {
    totalWater.update((n) => {
      const newTotal = n + waterInput;
      saveToStorage("totalWater", newTotal);
      return newTotal;
    });
    waterInput = 0;
  }
  onMount(() => {
    newDailyWaterGoal =
      Number(getFromStorage("dailyWaterGoal")) || $dailyWaterGoal;
    newDailyBreakGoal =
      Number(getFromStorage("dailyBreakGoal")) || $dailyBreakGoal;

    scheduleWaterNotifications(startTime, endTime, waterNotificationInterval);
    scheduleBreakNotifications(breakNotificationInterval);
  });
  const storedWater = getFromStorage("totalWater");

  if (storedWater) {
    totalWater.set(Number(storedWater));
  }

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
    <label>Horário de Início das Notificações:</label>
  <input type="time" bind:value={startTime} />
  <label>Horário de Término das Notificações:</label>
  <input type="time" bind:value={endTime} />
  
  <label>Intervalo das Notificações de Água (minutos):</label>
  <input
    type="number"
    bind:value={waterNotificationInterval}
    min="1"
    pattern="\d*"
    inputmode="numeric"
  />
  <label>Intervalo das Notificações de Pausa (minutos):</label>
  <input
    type="number"
    bind:value={breakNotificationInterval}
    min="1"
    pattern="\d*"
    inputmode="numeric"
  />
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
