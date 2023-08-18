
# **Water e Break**

Este é meu primeiro trabalho usando Svelte com Typescript e capacitor.
Um aplicativo para manter você hidratado e lembrá-lo de fazer pausas regulares ao longo do dia. Utilizando notificações, o aplicativo proporciona um meio de se manter saudável e produtivo durante longos períodos de trabalho.

## **Tabela de Conteúdos**
1. [Instalação](#instalação)
2. [Uso](#uso)
3. [Funcionalidades](#funcionalidades)
4. [API de Notificações](#api-de-notificações)
5. [Dicas e Melhores Práticas](#dicas-e-melhores-práticas)
6. [Licença](#licença)

---

## **Instalação**
```bash
npm install 
# ou 
pnpm install
```

---

## **Uso**
Após a instalação, execute a aplicação com:
```bash
npm build
# ou
pnpm build
```
``` bash
npx cap sync para
```
---
---

## **Rodar em Android e IOS**
Após a instalação, execute a aplicação com:
```bash
npx cap open ios 
# ou
npx cap open android 
```
E executar no Xcode ou no Android Studio
---
## **Funcionalidades**
1. **Lembretes de Hidratação**: Receba lembretes para beber água e manter-se hidratado.
2. **Lembretes de Pausa**: Seja lembrado de fazer pausas e alongamentos para evitar fadiga.
3. **Configurações Personalizadas**: Escolha os intervalos e horários em que deseja receber notificações.

---

## **API de Notificações**
- `checkPermissionStatus()`: Verifica se as permissões de notificação foram concedidas.
- `requestNotificationPermission()`: Solicita permissão para enviar notificações.
- `setDailyWaterGoal(goal: number)`: Define a quantidade de água diária a ser consumida.
- `setNotificationTimes(start: string, end: string)`: Estabelece horários para as notificações.
- `scheduleWaterNotifications(interval: number)`: Agenda lembretes de hidratação.
- `scheduleBreakNotifications(interval: number)`: Agenda lembretes de pausa.

---

## **Dicas e Melhores Práticas**
- Sempre obtenha **permissão** antes de agendar notificações.
- Para evitar interrupções, escolha **horários de início e término** que se alinhem com sua rotina.
- Personalize os intervalos de acordo com sua **necessidade de hidratação** e pausas.


## **Licença**
Este projeto está sob a licença [MIT](LINK_LICENÇA).

---
