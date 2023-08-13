<script lang="ts">
  import { onMount } from "svelte";
  import { totalWater, dailyWaterGoal } from "./store.js";
  import { Keyboard } from "@capacitor/keyboard";

  let waterInput = 0;
  let isKeyboardVisible = false;

  function addWater() {
    totalWater.update((n) => n + waterInput);
    waterInput = 0; // resetar o input após adicionar
  }

  onMount(() => {
    // Adicionar ouvinte quando o teclado é aberto
    Keyboard.addListener("keyboardDidShow", (info) => {
      isKeyboardVisible = true;
    });

    // E quando o teclado é fechado
    Keyboard.addListener("keyboardDidHide", () => {
      isKeyboardVisible = false;
    });
  });
</script>

<div class="container">
  <h2>Registro de Água</h2>
  <div class="progress-bar">
    <div
      class="progress"
      style="width: {($totalWater / $dailyWaterGoal) * 100}%"
    />
  </div>
  <label id="teste"> Quantidade de água (ml): </label>
  <div class="box-input">
    <input
      name="teste"
      type="number"
      bind:value={waterInput}
      min="0"
      pattern="\d*"
      inputmode="numeric"
      class={isKeyboardVisible ? "keyboard-visible" : ""}
    />

    <button on:click={addWater}>Adicionar</button>
  </div>

  <h3>Água ingerida hoje: {$totalWater} ml</h3>
  <p>
    Você consumiu {($totalWater / $dailyWaterGoal) * 100}% da sua meta diária!
  </p>

  <!-- Barra de progresso (exemplo básico) -->
  
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: rgb(125, 170, 193);
    border-radius: 10px;
  }

  .progress {
    height: 100%;
    border-radius: 10px;
    background-color: #053b58;
  }

  .keyboard-visible input[type="number"] {
    margin-top: 50vh; /* Ajuste conforme necessário */
  }

  .box-input {
    display: flex;
    justify-content: space-between;
  }
  label{
    margin-top: 10px;
  }
</style>
