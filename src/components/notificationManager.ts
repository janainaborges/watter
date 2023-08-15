import { LocalNotifications } from "@capacitor/local-notifications";
import { dailyWaterGoal } from "../teste/store";

export function scheduleWaterNotifications(startTime: string, endTime: string, interval: number) {
    const waterNotificationCount = (new Date(endTime).getHours() - new Date(startTime).getHours()) * (60 / interval);
    const waterAmountPerNotification = dailyWaterGoal / waterNotificationCount;

    LocalNotifications.schedule({
        notifications: [{
            title: "Hora de beber água!",
            body: `Beba ${waterAmountPerNotification}ml agora para manter-se hidratado.`,
            id: 1,
            schedule: { every: "minute", count: interval },
            actionTypeId: "drink-water",
            actions: [
                { id: 'add-water', title: 'Adicionei a água!', foreground: true }
            ],
            extra: null
        }]
    });
}

export function scheduleBreakNotifications(interval: number) {
    LocalNotifications.schedule({
        notifications: [{
            title: "Hora de uma pausa!",
            body: "Levante-se e alongue-se um pouco.",
            id: 2,
            schedule: { every: "minute", count: interval },
            actionTypeId: "take-break",
            actions: [
                { id: 'took-break', title: 'Fiz a pausa!', foreground: true }
            ],
            extra: null
        }]
    });
}
