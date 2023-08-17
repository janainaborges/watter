<script lang="ts">
  import {
    notificationsEnabled,
    waterNotificationInterval,
    breakNotificationInterval,
  } from "../../stores/store";
  import {
    scheduleBreakNotifications,
    scheduleWaterNotifications,
    checkPermissionStatus,
  } from "../../utils/notificationManager";
  import ButtonComponent from "../../components/ButtonComponent.svelte";
  import LabelComponent from "../../components/LabelComponent.svelte";
  import "../../styles/stylePages/setting.style.css";

  let startTime: string;
  let endTime: string;
  let waterNotificationsActive = true;
  let breakNotificationsActive = true;

  async function handleNotificationsToggle(type: "water" | "break") {
    const isActive = type === "water" ? waterNotificationsActive : breakNotificationsActive;
    const notificationInterval = type === "water" ? $waterNotificationInterval : $breakNotificationInterval;
    const scheduleFunction = type === "water" ? scheduleWaterNotifications : scheduleBreakNotifications;

    scheduleFunction(startTime, endTime, notificationInterval, isActive);
    notificationsEnabled.set(isActive);
  }

  function updateNotifications() {
    handleNotificationsToggle("water");
    handleNotificationsToggle("break");
  }

  $: updateNotifications();

  function toggleWaterNotifications() {
    waterNotificationsActive = !waterNotificationsActive;
  }

  function toggleBreakNotifications() {
    breakNotificationsActive = !breakNotificationsActive;
  }
</script>

<div class="container">
  <div class="notifications">
    <h3>Configurações de Notificações</h3>
    <div class="notification">
      <LabelComponent
        text="Horário de Início e Fim das Notificações:"
        forId="nameInput"
      />
      <div class="notification-input">
        <input type="time" bind:value={startTime} />
        <input type="time" bind:value={endTime} />
      </div>
    </div>

    <div class="button">
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
</div>
