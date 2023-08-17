<script lang="ts">
  import { onMount } from "svelte";
  import ProgressBar from "../components/ProgressBar.svelte";
  import {
    totalWater,
    dailyWaterGoal,
    saveToStorage,
    getFromStorage,
    addToHistory,
  } from "../stores/store";
  import { Keyboard } from "@capacitor/keyboard";
  import { LocalNotifications } from "@capacitor/local-notifications";
  import { scheduleWaterNotifications } from "../utils/notificationManager";
  import InputComponent from "../components/InputComponent.svelte";
  import ButtonComponent from "../components/ButtonComponent.svelte";
  import "../styles/stylePages/water.style.css";
  import LabelComponent from "../components/LabelComponent.svelte";

  let waterInput = 0;
  let isKeyboardVisible = false;
  let startTime: string;
  let endTime: string;
  let waterNotificationInterval = 15;

  let inputElement;

  function handleFocus() {
    inputElement.scrollIntoView({ behavior: "smooth" });
  }

  function addWater() {
    totalWater.update((n) => {
      const newTotal = n + waterInput;
      saveToStorage("totalWater", newTotal);
      return newTotal;
    });
    addToHistory("water", waterInput);
    waterInput = 0;
  }

  function scheduleNotifications() {
    const waterNotificationCount =
      (new Date(endTime).getHours() - new Date(startTime).getHours()) * 4;
    const waterAmountPerNotification = $dailyWaterGoal / waterNotificationCount;

    LocalNotifications.schedule({
      notifications: [
        {
          title: "Hora de beber água!",
          body: `Beba ${waterAmountPerNotification}ml agora para manter-se hidratado.`,
          id: 1,
          schedule: { every: "minute", count: 15 },
          actionTypeId: "drink-water",
          extra: null,
        },
        {
          title: "Hora de uma pausa!",
          body: "Levante-se e alongue-se um pouco.",
          id: 2,
          schedule: { every: "minute", count: 30 },
          actionTypeId: "take-break",
          extra: null,
        },
      ],
    });
  }

  onMount(() => {
    Keyboard.addListener("keyboardDidShow", (info) => {
      isKeyboardVisible = true;
    });
    Keyboard.addListener("keyboardDidHide", () => {
      isKeyboardVisible = false;
    });

    scheduleNotifications();
    
    scheduleWaterNotifications(waterNotificationInterval);
});

  const storedWater = getFromStorage("totalWater");

  if (storedWater) {
    totalWater.set(Number(storedWater));
  }
</script>

<div class="app-container">
  <h2>Registro de Água</h2>
  <ProgressBar percentage={($totalWater / $dailyWaterGoal) * 100} />
  <LabelComponent text="Adicione a quantidade de água (ml):" forId="nameInput" />
  <div class="box-input">
    <div>
      <InputComponent
        type="number"
        inputmode="numeric"
        min="1"
        bind:value={waterInput}
        pattern=""
      />
    </div>
    <div>
      <ButtonComponent label="Adicionar" onClick={addWater} />
    </div>
  </div>
  <h3>Água ingerida hoje: {$totalWater} ml</h3>
  <p>
    Você consumiu {($totalWater / $dailyWaterGoal) * 100}% da sua meta diária!
  </p>
</div>
