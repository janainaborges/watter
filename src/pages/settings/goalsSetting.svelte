<script lang="ts">
  import { onMount } from "svelte";
  import {
    clearStorage,
    totalWater,
    dailyWaterGoal,
    dailyBreakGoal,
    saveToStorage,
    getFromStorage,
  } from "../../stores/store";
  import InputComponent from "../../components/InputComponent.svelte";
  import ButtonComponent from "../../components/ButtonComponent.svelte";

  import "../../styles/stylePages/setting.style.css"
  import LabelComponent from "../../components/LabelComponent.svelte";

  let newDailyWaterGoal: number;
  let newDailyBreakGoal: number;
  let currentView: "goals" | "notifications" = "goals";

  function handleClearCache() {
    clearStorage();
    alert("Cache limpo com sucesso!");
  }

  const storedWater = getFromStorage("totalWater");
  if (storedWater) {
    totalWater.set(Number(storedWater));
  }

  function initializeVariablesFromStorage() {
    newDailyWaterGoal =
      Number(getFromStorage("dailyWaterGoal")) || $dailyWaterGoal;
    newDailyBreakGoal =
      Number(getFromStorage("dailyBreakGoal")) || $dailyBreakGoal;
  }

  onMount(() => {
    initializeVariablesFromStorage();
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

  <h2>Configurações Diárias</h2>

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
          label="Atualizar"
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
          label="Atualizar"
          on:click={() => updateGoal("break", newDailyBreakGoal)}
        />
      </div>
    </div>
  </div>
  <ButtonComponent on:click={handleClearCache} label="Limpar Cache" />
