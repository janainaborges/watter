import { writable } from 'svelte/store';

export const totalWater = writable(0);
export const dailyWaterGoal = writable(2000); // por exemplo, 2 litros
export const totalBreaks = writable(0);
export const dailyBreakGoal = writable(8); // por exemplo, 8 pausas por dia