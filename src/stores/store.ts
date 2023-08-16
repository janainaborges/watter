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
  localStorage.setItem(key, value.toString());
}

export function getFromStorage(key: string): string | null {
  return localStorage.getItem(key);
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
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  
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

  localStorage.setItem("history", JSON.stringify(history));
  historyStore.set(history);
}

