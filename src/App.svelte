<script>
  import BreakTracker from "./pages/BreakTracker.svelte";
  import Settings from "./pages/Settings.svelte";
  import { App } from "@capacitor/app";
  import WaterTracker from "./pages/WaterTracker.svelte";
  import { Capacitor } from "@capacitor/core";
  import History from "./pages/History.svelte";
  import "../src/styles/app.css"
  import { LocalNotifications } from "@capacitor/local-notifications";
  import { Router, Route } from 'svelte-routing';

  let currentPage = "home";
  function navigate(page) {
    currentPage = page;
  }

  let platformStyle = "";

  if (Capacitor.platform === "ios") {
    platformStyle =
      "padding: calc(4rem + env(safe-area-inset-top)); font-size: medium; bottom: 0 ; "; 
  } else if (Capacitor.platform === "android") {
    platformStyle = "padding-top: 10px; bottom: 0";
  } else {
    platformStyle = "padding-top: 5px; font-size: medium; top: 0; just"; 
  }

  let isMobile =
    Capacitor.platform === "ios" || Capacitor.platform === "android";

  let platformStyles = isMobile ? "bottom: 0; align-items: start;" : "top: 0";

  App.addListener("appUrlOpen", (data) => {
    if (data.url.includes("register-water")) {
      navigate("water");
    } else if (data.url.includes("register-break")) {
      navigate("break");
    }
  });
  
  LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
    if (notificationAction.actionId === 'drink-water') {
        navigate('/water');
    } else if (notificationAction.actionId === 'take-break') {
        navigate('/break');
    }
});
</script>

<nav style={platformStyles}>
  <button on:click={() => navigate("water")}>
    {#if isMobile}
      <div class="content-button nav-icon.active">
        <span
          class={`material-symbols-outlined nav-icon material-icons ${
            currentPage === "water" ? "active" : ""
          }`}>home</span
        >
        home
      </div>
    {:else}
      Início
    {/if}
  </button>

  <button on:click={() => navigate("break")}>
    {#if isMobile}
      <div class="content-button nav-icon.active">
        <span
          class={`material-symbols-outlined nav-icon material-icons ${
            currentPage === "break" ? "active" : ""
          }`}>timer</span
        >
        stop
      </div>
    {:else}
      Pausa
    {/if}
  </button>

  <button on:click={() => navigate("history")}>
    {#if isMobile}
      <div class="content-button nav-icon.active">
        <span
          class={`material-symbols-outlined nav-icon material-icons ${
            currentPage === "history" ? "active" : ""
          }`}>history</span
        >
        Históricos
      </div>
    {:else}
      Histórico
    {/if}
  </button>

  <button on:click={() => navigate("settings")}>
    {#if isMobile}
      <div class="content-button nav-icon.active">
        <span
          class={`material-symbols-outlined nav-icon material-icons ${
            currentPage === "settings" ? "active" : ""
          }`}>settings</span
        >
        settings
      </div>
    {:else}
      Configurações
    {/if}
  </button>
</nav>

<div>
  {#if currentPage === "water"}
    <WaterTracker />
  {:else if currentPage === "break"}
    <BreakTracker />
  {:else if currentPage === "settings"}
    <Settings />
  {:else if currentPage === "history"}
    <History />
  {:else}
    <WaterTracker />
  {/if}
</div>
<Router>
  <Route path="/water" component={WaterTracker} />
  <Route path="/break" component={BreakTracker} />
</Router>

