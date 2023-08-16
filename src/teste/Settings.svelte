<script lang="ts">
  import { onMount } from "svelte";
  import { clearStorage, totalWater } from "./store";

  import {
    dailyWaterGoal,
    dailyBreakGoal,
    saveToStorage,
    getFromStorage,
    breakNotificationInterval,
    waterNotificationInterval,
  } from "./store";
  import {
    scheduleBreakNotifications,
    scheduleWaterNotifications,
  } from "../components/notificationManager";
  import InputComponent from "../components/InputComponent.svelte";
  import ButtonComponent from "../components/ButtonComponent.svelte";

  let newDailyWaterGoal: number;
  let newDailyBreakGoal: number;

  function handleClearCache() {
    clearStorage();
    alert("Cache limpo com sucesso!");
  }

  let waterInput = 0;
  let startTime: string;
  let endTime: string;

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
    startTime = getFromStorage("startTime") || "";
    endTime = getFromStorage("endTime") || "";
    waterNotificationInterval.update(
      () => Number(getFromStorage("waterNotificationInterval")) || 15
    );
    breakNotificationInterval.update(
      () => Number(getFromStorage("breakNotificationInterval")) || 30
    );
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
  function saveChanges() {
    const breakInterval = $breakNotificationInterval;
    const waterInterval = $waterNotificationInterval;

    saveToStorage("dailyWaterGoal", newDailyWaterGoal);
    saveToStorage("dailyBreakGoal", newDailyBreakGoal);
    saveToStorage("startTime", startTime);
    saveToStorage("endTime", endTime);
    saveToStorage("breakNotificationInterval", breakInterval);
    saveToStorage("waterNotificationInterval", waterInterval);

    scheduleWaterNotifications(startTime, endTime, waterInterval);
    scheduleBreakNotifications(startTime, endTime, breakInterval);

    alert("Changes saved successfully!");
  }
</script>

<div class="container">
  <h2>Configurações Diárias</h2>

  <div class="goals">
    <div class="goal">
      <label>Meta diária de água (ml):</label>

      <InputComponent
        type="number"
        inputmode="numeric"
        min="1"
        pattern=""
        bind:value={newDailyWaterGoal}
        placeholder={$dailyWaterGoal.toString()}
      />
      <ButtonComponent on:click={() => updateGoal("water", newDailyWaterGoal)} label="alizar Meta de Água"/>
      
    </div>
    <div class="goal">
      <label>Meta diária de pausas:</label>
      <InputComponent
        type="number"
        pattern=""
        min="1"
        inputmode="numeric"
        bind:value={newDailyBreakGoal}
        placeholder={$dailyBreakGoal.toString()}
      />
      <ButtonComponent label="Atualizar Meta de Pausas"  on:click={() => updateGoal("break", newDailyBreakGoal)} />
       
   
    </div>
  </div>
  <div class="notifications">
    <h3>Configurações de Notificações</h3>
    <div class="notification">
      <label>Horário de Início das Notificações:</label>
      <input
        type="time"
        bind:value={startTime}
        on:change={() => {
          const waterInterval = $waterNotificationInterval; // Obtém o valor do store
          const breakInterval = $breakNotificationInterval; // Obtém o valor do store
          scheduleWaterNotifications(startTime, endTime, waterInterval);
          scheduleBreakNotifications(startTime, endTime, breakInterval);
        }}
      />

      <label>Horário de Término das Notificações:</label>
      <input
        type="time"
        bind:value={endTime}
        on:change={() => {
          const waterInterval = $waterNotificationInterval; // Obtém o valor do store
          const breakInterval = $breakNotificationInterval; // Obtém o valor do store
          scheduleWaterNotifications(startTime, endTime, waterInterval);
          scheduleBreakNotifications(startTime, endTime, breakInterval);
        }}
      />
    </div>

    <div class="intervals">
      <div>
        <label>Intervalo das Notificações de Água (minutos):</label>
        <InputComponent
          type="number"
          bind:value={$waterNotificationInterval}
          min="1"
          pattern="\d*"
          inputmode="numeric"
          on:change={() => {
            const interval = $waterNotificationInterval;
            scheduleWaterNotifications(startTime, endTime, interval);
          }}
        />
      </div>

      <div>
        <label>Intervalo das Notificações de Pausa (minutos):</label>
        <InputComponent
          type="number"
          bind:value={$breakNotificationInterval}
          min="1"
          pattern="\d*"
          inputmode="numeric"
          on:change={() => {
            const interval = $breakNotificationInterval;
            scheduleBreakNotifications(startTime, endTime, interval);
          }}
        />
      </div>
    </div>

    <div>
      <ButtonComponent label="Save Changes" on:click={saveChanges}/>
      <ButtonComponent on:click={handleClearCache} label="Limpar Cache"/>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .goals {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }

  .goal {
    flex: 1;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .goal:last-child {
    margin-right: 0;
  }

  .notifications {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
  }

  .notification,
  .intervals {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .intervals > div {
    flex: 1;
    margin-right: 10px;
  }

  .intervals > div:last-child {
    margin-right: 0;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }
</style>
