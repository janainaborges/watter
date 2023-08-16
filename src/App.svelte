<script>
  import BreakTracker from "./pages/BreakTracker.svelte";
  import Settings from "./pages/Settings.svelte";
  import { App } from "@capacitor/app";
  import WaterTracker from "./pages/WaterTracker.svelte";
  import { Capacitor } from "@capacitor/core";
  import History from "./pages/History.svelte";
  let currentPage = "home";
  function navigate(page) {
    currentPage = page;
  }

  let platformStyle = "";

  if (Capacitor.platform === "ios") {
    platformStyle =
      "padding: calc(4rem + env(safe-area-inset-top)); font-size: medium; bottom: 0 ; "; // para iOS
  } else if (Capacitor.platform === "android") {
    platformStyle = "padding-top: 10px; bottom: 0"; // Exemplo para Android
  } else {
    platformStyle = "padding-top: 5px; font-size: medium; top: 0; just"; // Exemplo para Web
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

<style>
  body {
    font-family: "Poppins", sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ccc;
  }

  nav {
    background-color: white;
    color: white;
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: space-around;
  }

  nav button {
    background-color: transparent;
    border: none;
    color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: space-around;
  }

  div {
    margin-top: 10%;
  }
  .nav-icon {
    color: #ccc;
    font-size: 24px;
    transition: color 0.3s;
  }

  .nav-icon.active {
    color: black;
    /* border-top: 1px solid black; */
  }
  .content-button {
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
  }
  .button-location {
    position: absolute;
    left: 0;
    top: 10px;
  }
</style>
