<script lang="ts">
  import ButtonComponent from "../components/ButtonComponent.svelte";
  import "../styles/stylePages/setting.style.css";
  import GoalsSetting from "./settings/goalsSetting.svelte";
  import NotificationSetting from "./settings/notificationSetting.svelte";
  let currentView: "goals" | "notifications" = "goals";

  function switchToGoals() {
    currentView = "goals";
  }

  function switchToNotifications() {
    currentView = "notifications";
  }
</script>

<div class="app-container">
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
    <GoalsSetting />
  {/if}

  {#if currentView === "notifications"}
    <NotificationSetting />
  {/if}
</div>
