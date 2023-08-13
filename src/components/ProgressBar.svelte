<script>
  export let type = "water";
  let isActive = false;


  function toggleNotification() {
    isActive = !isActive;
    if (isActive) {
      console.log("Notificações ativadas.");
    } else {
      console.log("Notificações desativadas.");
    }
  }
</script>

<button
  on:click={toggleNotification}
  style="--bg-color: {isActive ? 'green' : 'red'}; --hover-color: {isActive
    ? '#006600'
    : '#990000'};"
>
  {type === "water" ? "Notificações de Água" : "Notificações de Pausa"}: {isActive
    ? "Ativadas"
    : "Desativadas"}
</button>

<style>
  /* Estilização básica do botão */
  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: blue;
    color: white;
    cursor: pointer;
    /* transition: background-color 0.3s; */
  }

  button:hover {
    background-color: var(--hover-color);
  }
</style>
