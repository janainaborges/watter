<script>
  import { onMount } from "svelte";
  import { historyStore } from "../stores/store";
  import "../styles/stylePages/history.style.css";

  onMount(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");
    historyStore.set(storedHistory);
  });

  function formatDate(dateString) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function formatTime(dateString) {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  }
</script>

<div class="app-container">
  <table>
    <thead>
      <tr>
        <th>Dia</th>
        <th>Água ingerida (ml)</th>
        <th>Pausas realizadas</th>
      </tr>
    </thead>
    <tbody>
      {#each $historyStore as record}
        <tr>
          <td rowspan={record.water.length || 1}>{formatDate(record.data)}</td>
          <td
            >{record.water[0]
              ? `${record.water[0].amount}ml at ${formatTime(
                  record.water[0].timestamp
                )}`
              : ""}</td
          >
          <td>{formatTime(record.breaks[0] || "")}</td>
        </tr>
        {#each record.water.slice(1) as { timestamp, amount }}
          <tr>
            <td>{amount}ml at {formatTime(timestamp)}</td>
          </tr>
        {/each}
      {/each}
    </tbody>
  </table>
</div>
