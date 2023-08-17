<script lang="ts">
  import {
    notificationsEnabled,
    waterNotificationInterval,
    breakNotificationInterval,
  } from "../../stores/store";
  import {
    cancelNotifications,
    scheduleBreakNotifications,
    scheduleWaterNotifications,
  } from "../../utils/notificationManager";
  import ButtonComponent from "../../components/ButtonComponent.svelte";
  import LabelComponent from "../../components/LabelComponent.svelte";
  import "../../styles/stylePages/setting.style.css";

  let startTime: string = "08:00";
  let endTime: string = "20:00";
  let waterNotificationsActive = true;
  let breakNotificationsActive = true;

  async function handleNotificationsToggle(type: "water" | "break") {
    const isActive =
      type === "water" ? waterNotificationsActive : breakNotificationsActive;
    const notificationInterval =
      type === "water"
        ? $waterNotificationInterval
        : $breakNotificationInterval;

    if (isActive) {
      await (type === "water"
        ? scheduleWaterNotifications
        : scheduleBreakNotifications)(notificationInterval);
    } else {
      const baseId = type === "water" ? 1000 : 2000;
      const numberOfNotifications =
        ((Number(endTime.split(":")[0]) - Number(startTime.split(":")[0])) *
          60) /
        notificationInterval;
      const idsToCancel = Array.from(
        { length: numberOfNotifications },
        (_, i) => baseId + i
      );

      await cancelNotifications(idsToCancel);
    }
    notificationsEnabled.set(isActive);
  }

  function toggleWaterNotifications() {
    waterNotificationsActive = !waterNotificationsActive;
    handleNotificationsToggle("water");
  }

  function toggleBreakNotifications() {
    breakNotificationsActive = !breakNotificationsActive;
    handleNotificationsToggle("break");
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

    <div class="notification">
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
</div>
