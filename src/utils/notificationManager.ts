import { LocalNotifications } from "@capacitor/local-notifications";
import { dailyWaterGoal } from "../stores/store";

// Verifica o status da permissão para notificações
async function checkPermissionStatus(): Promise<boolean> {
  const result: any = await LocalNotifications.checkPermissions();
  return result.receive === "granted";
}

// Solicita permissão para notificações
export async function requestNotificationPermission(): Promise<boolean> {
  const result: any = await LocalNotifications.requestPermissions();
  return result.receive === "granted";
}

// Função para agendar notificações de água
export async function scheduleWaterNotifications(
  startTime: string,
  endTime: string,
  interval: number,
) {
  if (!(await checkPermissionStatus())) {
    console.error("Permissão para notificações negada.");
    return;
  }

  const startDate = new Date(`1970-01-01T${startTime}:00Z`);
  const endDate = new Date(`1970-01-01T${endTime}:00Z`);
  const totalMinutes = (endDate.getTime() - startDate.getTime()) / 60000;
  const numberOfNotifications = totalMinutes / interval;
  

  let goalValue = 0; // Valor inicial para a meta de água
  const unsubscribeFromDailyWaterGoal = dailyWaterGoal.subscribe((value) => {
    goalValue = value;
  });
  unsubscribeFromDailyWaterGoal();

  const waterAmountPerNotification = goalValue / numberOfNotifications;
  const notifications = [];

  // Notificação de início do regime de hidratação
  notifications.push({
    title: "Hora de beber água!",
    body: `Comece seu regime de hidratação bebendo ${waterAmountPerNotification}ml agora.`,
    id: 999,
    schedule: { at: new Date() }, // Será agendada para agora
    actionTypeId: "drink-water-start",
    actions: [
      { id: "add-water-start", title: "Comecei agora!", foreground: true },
    ],
  });

  // Agendar notificações de água
  for (let i = 0; i < numberOfNotifications; i++) {
    const notificationTime = new Date(
      startDate.getTime() + i * interval * 60 * 1000,
    );
    notifications.push({
      title: "Hora de beber água!",
      body: `Beba ${waterAmountPerNotification}ml agora para manter-se hidratado.`,
      id: 1000 + i,
      schedule: { at: notificationTime },
      actionTypeId: "drink-water",
      actions: [
        { id: "add-water", title: "Adicionei a água!", foreground: true },
      ],
    });
  }

  // Agendar as notificações de água
  await LocalNotifications.schedule({
    notifications: notifications,
  });
}

// Função para agendar notificações de pausa
export async function scheduleBreakNotifications(
  startTime: string,
  endTime: string,
  interval: number,
) {
  if (!(await checkPermissionStatus())) {
    console.error("Permissão para notificações negada.");
    return;
  }

  const startDate = new Date(`1970-01-01T${startTime}:00Z`);
  const endDate = new Date(`1970-01-01T${endTime}:00Z`);
  const totalMinutes = (endDate.getTime() - startDate.getTime()) / 60000;
  const numberOfNotifications = totalMinutes / interval;

  const notifications = [];

  // Agendar notificações de pausa
  for (let i = 0; i < numberOfNotifications; i++) {
    const notificationTime = new Date(
      startDate.getTime() + i * interval * 60 * 1000,
    );
    notifications.push({
      title: "Hora de uma pausa!",
      body: "Levante-se e alongue-se um pouco.",
      id: 2000 + i,
      schedule: { at: notificationTime },
      actionTypeId: "take-break",
      actions: [{ id: "took-break", title: "Fiz a pausa!", foreground: true }],
    });
  }

  // Agendar as notificações de pausa
  await LocalNotifications.schedule({
    notifications: notifications,
  });
}

// Inicialização das notificações
export async function initNotifications() {
  const hasPermission = await requestNotificationPermission();
  if (hasPermission) {
    // Exemplos de chamadas para agendar notificações de água e pausa
    await scheduleWaterNotifications("08:00", "20:00", 60);
    await scheduleBreakNotifications("08:30", "19:30", 120);

    // Notificação de teste para ser disparada imediatamente
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

// Chama a inicialização das notificações
initNotifications();
