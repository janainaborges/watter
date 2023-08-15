import { writable } from "svelte/store";

export const totalWater = writable(0);
export const dailyWaterGoal = writable(2000); 
export const totalBreaks = writable(0);
export const dailyBreakGoal = writable(8); 


export const historyStore = writable({});

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


  totalWater.set(0);
  totalBreaks.set(0);
  dailyWaterGoal.set(2000);
  dailyBreakGoal.set(8);
  historyStore.set({}); 
}


export function addToHistory(type: "water" | "break", amount: number) {
    const today = new Date().toISOString().split("T")[0]; 
    const history = JSON.parse(localStorage.getItem("history") || "{}");
    if (!history[today]) {
      history[today] = { water: [], breaks: [] };
    }
    history[today][type].push(amount);
    localStorage.setItem("history", JSON.stringify(history));
    historyStore.set(history); 
  }
  
  