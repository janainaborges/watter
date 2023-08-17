import { writable } from "svelte/store";

export const totalWater = writable(0);
export const dailyWaterGoal = writable(2000);
export const totalBreaks = writable(0);
export const dailyBreakGoal = writable(8);
export const breakNotificationInterval = writable(30);
export const waterNotificationInterval = writable(15);
export const notificationsEnabled = writable(true);
export const historyStore = writable([]);

export function saveToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key: string): any {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function clearStorage() {
  localStorage.removeItem("totalWater");
  localStorage.removeItem("totalBreaks");
  localStorage.removeItem("dailyWaterGoal");
  localStorage.removeItem("dailyBreakGoal");
  localStorage.removeItem("history");
  localStorage.removeItem("breakNotificationInterval");
  localStorage.removeItem("waterNotificationInterval");

  totalWater.set(0);
  totalBreaks.set(0);
  dailyWaterGoal.set(2000);
  dailyBreakGoal.set(8);
  historyStore.set([]);
  breakNotificationInterval.set(30);
  waterNotificationInterval.set(15);
}

export function addToHistory(type: "water" | "break", amount?: number) {
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toISOString();
  const history = getFromStorage("history") || [];
  
  let entry = history.find(e => e.data === today);

  if (!entry) {
      entry = {
          data: today,
          water: [],
          breaks: []
      };
      history.push(entry);
  }

  if(type === "water" && amount) {
      entry.water.push({timestamp: currentTime, amount: amount});
  } else if(type === "break") {
      entry.breaks.push(currentTime);
  }

  saveToStorage("history", history);
  historyStore.set(history);
}

function loadInitialValues() {
  const storedWater = getFromStorage("totalWater");
  if (storedWater !== null) totalWater.set(storedWater);

  const storedBreaks = getFromStorage("totalBreaks");
  if (storedBreaks !== null) totalBreaks.set(storedBreaks);

  const storedDailyWaterGoal = getFromStorage("dailyWaterGoal");
  if (storedDailyWaterGoal !== null) dailyWaterGoal.set(storedDailyWaterGoal);

  const storedDailyBreakGoal = getFromStorage("dailyBreakGoal");
  if (storedDailyBreakGoal !== null) dailyBreakGoal.set(storedDailyBreakGoal);

  const storedHistory = getFromStorage("history");
  if (storedHistory !== null) historyStore.set(storedHistory);

  const storedBreakInterval = getFromStorage("breakNotificationInterval");
  if (storedBreakInterval !== null) breakNotificationInterval.set(storedBreakInterval);

  const storedWaterInterval = getFromStorage("waterNotificationInterval");
  if (storedWaterInterval !== null) waterNotificationInterval.set(storedWaterInterval);
}

loadInitialValues();
