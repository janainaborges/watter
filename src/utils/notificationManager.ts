import { LocalNotifications } from "@capacitor/local-notifications";

let dailyWaterGoal = 2000;
let notificationStartTime = "08:00";
let notificationEndTime = "20:00";

export async function checkPermissionStatus(): Promise<boolean> {
    const result: any = await LocalNotifications.checkPermissions();
    return result.receive === "granted";
  }
  
  export async function requestNotificationPermission(): Promise<boolean> {
    const result: any = await LocalNotifications.requestPermissions();
    return result.receive === "granted";
  }

export function setDailyWaterGoal(goal: number) {
  dailyWaterGoal = goal;
}

export function setNotificationTimes(start: string, end: string) {
  notificationStartTime = start;
  notificationEndTime = end;
}

export async function scheduleWaterNotifications(interval: number) {
  if (!(await checkPermissionStatus())) {
    console.error("Permissão para notificações negada.");
    return;
  }

  const startDate = new Date(`1970-01-01T${notificationStartTime}:00Z`);
  const endDate = new Date(`1970-01-01T${notificationEndTime}:00Z`);
  const totalMinutes = (endDate.getTime() - startDate.getTime()) / 60000;
  const numberOfNotifications = totalMinutes / interval;
  const waterAmountPerNotification = dailyWaterGoal / numberOfNotifications;

  const notifications = [];

  for (let i = 0; i < numberOfNotifications; i++) {
    const notificationTime = new Date(
      startDate.getTime() + i * interval * 60 * 1000
    );
    notifications.push({
      title: "Hora de beber água!",
      body: `Beba ${waterAmountPerNotification}ml agora para manter-se hidratado.`,
      id: 1000 + i,
      schedule: { at: notificationTime },
      actionTypeId: "drink-water",
      actions: [
        { id: `add-water-${i}`, title: "Adicionei a água!", foreground: true },
      ],
    });
  }

  await LocalNotifications.schedule({
    notifications: notifications,
  });
}

export async function scheduleBreakNotifications(interval: number) {
  if (!(await checkPermissionStatus())) {
    console.error("Permissão para notificações negada.");
    return;
  }

  const startDate = new Date(`1970-01-01T${notificationStartTime}:00Z`);
  const endDate = new Date(`1970-01-01T${notificationEndTime}:00Z`);
  const totalMinutes = (endDate.getTime() - startDate.getTime()) / 60000;
  const numberOfNotifications = totalMinutes / interval;

  const notifications = [];

  for (let i = 0; i < numberOfNotifications; i++) {
    const notificationTime = new Date(
      startDate.getTime() + i * interval * 60 * 1000
    );
    notifications.push({
      title: "Hora de uma pausa!",
      body: "Levante-se e alongue-se um pouco.",
      id: 2000 + i,
      schedule: { at: notificationTime },
      actionTypeId: "take-break",
      actions: [{ id: `took-break-${i}`, title: "Fiz a pausa!", foreground: true }],
    });
  }

  await LocalNotifications.schedule({
    notifications: notifications,
  });
}

export async function initNotifications() {
  const hasPermission = await requestNotificationPermission();
  if (hasPermission) {
    await scheduleWaterNotifications(15);
    await scheduleBreakNotifications(30);

    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Notificação de Teste",
          body: "Isso é apenas um teste!",
          id: 9999,
          actionTypeId: "test-notification",
          actions: [
            { id: "test-action", title: "Isso é um teste!", foreground: true },
          ],
        },
      ],
    });
  } else {
    console.error("Permissão para notificações negada.");
  }
}

initNotifications();
