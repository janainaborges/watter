<script>
  import { onMount } from "svelte";
  import { historyStore } from "./store";

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

<div class="container">
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
            <!-- You can add more columns as needed -->
          </tr>
        {/each}
      {/each}
    </tbody>
  </table>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    place-items: center;
    padding: 1em;
    background-color: #e0f7fa; /* Light blue background to give a watery feel */
  }

  table {
    width: 80%; /* Adjust as needed */
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    border: 1px solid #0097a7; /* Border color */
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: #00bcd4; /* Header background color */
    color: white;
  }

  tr:nth-child(even) {
    background-color: #e0f7fa; /* Even rows background color */
  }

  tr:hover {
    background-color: #b2ebf2; /* Row hover background color */
  }

  tbody tr:first-child td {
    font-weight: bold; /* Make the first row text bold */
  }
</style>
