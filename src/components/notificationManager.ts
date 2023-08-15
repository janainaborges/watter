// notificationManager.ts

import { dailyWaterGoal } from "../teste/store";
import { LocalNotifications } from '@capacitor/local-notifications';

export function scheduleWaterNotifications(startTime: string, endTime: string, intervalMinutes: number) {
    const waterNotificationCount = (new Date(endTime).getHours() - new Date(startTime).getHours()) * (60 / intervalMinutes);
    const waterAmountPerNotification = dailyWaterGoal / waterNotificationCount;

    LocalNotifications.schedule({
        notifications: [{
            title: "Hora de beber água!",
            body: `Beba ${waterAmountPerNotification}ml agora para manter-se hidratado.`,
            id: 1,
            schedule: { every: "minute", count: intervalMinutes },
            actionTypeId: "drink-water",
            extra: null
        }]
    });
}

export function scheduleBreakNotifications(intervalMinutes: number) {
    LocalNotifications.schedule({
        notifications: [{
            title: "Hora de uma pausa!",
            body: "Levante-se e alongue-se um pouco.",
            id: 2,
            schedule: { every: "minute", count: intervalMinutes },
            actionTypeId: "take-break",
            extra: null
        }]
    });
}
