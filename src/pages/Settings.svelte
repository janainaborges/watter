<script lang="ts">
  import { onMount } from "svelte";
  import {
    clearStorage,
    notificationsEnabled,
    totalWater,
  } from "../stores/store";
  import {
    dailyWaterGoal,
    dailyBreakGoal,
    saveToStorage,
    getFromStorage,
    breakNotificationInterval,
    waterNotificationInterval,
  } from "../stores/store";
  import {
    scheduleBreakNotifications,
    scheduleWaterNotifications,
  } from "../utils/notificationManager";
  import InputComponent from "../components/InputComponent.svelte";
  import ButtonComponent from "../components/ButtonComponent.svelte";

  import '../styles/stylePages/setting.style.css'
  import LabelComponent from "../components/LabelComponent.svelte";

  
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

  let currentView: "goals" | "notifications" = "goals";

  function switchToGoals() {
    currentView = "goals";
  }

  function switchToNotifications() {
    currentView = "notifications";
  }

  let waterNotificationsActive = true;
  let breakNotificationsActive = true;

  function toggleWaterNotifications() {
    waterNotificationsActive = !waterNotificationsActive;
    if (waterNotificationsActive) {
      const interval = $waterNotificationInterval;
      scheduleWaterNotifications(startTime, endTime, interval);
    }
    notificationsEnabled.set(waterNotificationsActive);
  }

  function toggleBreakNotifications() {
    breakNotificationsActive = !breakNotificationsActive;
    if (breakNotificationsActive) {
      const interval = $breakNotificationInterval;
      scheduleBreakNotifications(startTime, endTime, interval);
    }
    notificationsEnabled.set(breakNotificationsActive);
  }
</script>

<div class="container">
  <h2>Configurações Diárias</h2>
  <div class="view-toggle">
    <ButtonComponent
      on:click={switchToGoals}
      label="Metas"
      backgroundColor="#83b8aa"
    />
    <ButtonComponent
      on:click={switchToNotifications}
      label="Notificações"
      backgroundColor="#83b8aa"
    />
  </div>
  {#if currentView === "goals"}
    <div class="goals">
      <div class="goal">
        <LabelComponent text="Meta diária de água (ml):" forId="nameInput" />
        <InputComponent
          type="number"
          inputmode="numeric"
          min="1"
          pattern=""
          bind:value={newDailyWaterGoal}
          placeholder={$dailyWaterGoal.toString()}
        />
        <div class="button">
          <ButtonComponent
            on:click={() => updateGoal("water", newDailyWaterGoal)}
            label="Atualizar Meta de Água"
          />
        </div>
      </div>
      <div class="goal">
        <LabelComponent text="Meta diária de pausas:" forId="nameInput" />
        <InputComponent
          type="number"
          pattern=""
          min="1"
          inputmode="numeric"
          bind:value={newDailyBreakGoal}
          placeholder={$dailyBreakGoal.toString()}
        />
        <div class="button">
          <ButtonComponent
            label="Atualizar Meta de Pausas"
            on:click={() => updateGoal("break", newDailyBreakGoal)}
          />
        </div>
      </div>

      <div class="box">
        <ButtonComponent
          label={waterNotificationsActive
            ? "Desativar Notificações de Água"
            : "Ativar Notificações de Água"}
          on:click={toggleWaterNotifications}
          backgroundColor="#272d4d"
        />
        <ButtonComponent
          label={breakNotificationsActive
            ? "Desativar Notificações de Pausa"
            : "Ativar Notificações de Pausa"}
          on:click={toggleBreakNotifications}
          backgroundColor="#272d4d"
        />
      </div>
    </div>
  {/if}

  {#if currentView === "notifications"}
    <div class="notifications">
      <h3>Configurações de Notificações</h3>
      <div class="notification">
        <LabelComponent text="Horário de Início das Notificações:" forId="nameInput" />
        <div class="notification-input">
          <input
            type="time"
            bind:value={startTime}
            on:change={() => {
              const waterInterval = $waterNotificationInterval;
              const breakInterval = $breakNotificationInterval;
              scheduleWaterNotifications(startTime, endTime, waterInterval);
              scheduleBreakNotifications(startTime, endTime, breakInterval);
            }}
          />
        </div>

        <LabelComponent text="Horário de Término das Notificações:" forId="nameInput" />
        <div class="notification-input">
          <input
            type="time"
            bind:value={endTime}
            on:change={() => {
              const waterInterval = $waterNotificationInterval;
              const breakInterval = $breakNotificationInterval;
              scheduleWaterNotifications(startTime, endTime, waterInterval);
              scheduleBreakNotifications(startTime, endTime, breakInterval);
            }}
          />
        </div>
      </div>

      <div class="intervals">
        <div>
          <LabelComponent text="Intervalo das Notificações de Água (minutos):" forId="nameInput" />
          <div class="notification-input">
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
        </div>
        <div>
          <LabelComponent text="Intervalo das Notificações de Pausa (minutos):" forId="nameInput" />
          <div class="notification-input">
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
      </div>
      <div>
        <ButtonComponent label="Save Changes" on:click={saveChanges} />
        <ButtonComponent on:click={handleClearCache} label="Limpar Cache" />
      </div>
    </div>
  {/if}
</div>

