<script lang="ts">
  export let label: string = "Button";
  export let onClick: () => void = () => {};
</script>

<button on:click={onClick}>{label}</button>

<style>
  button {
    background-color: #007acc; /* dark blue resembling deeper waters */
    color: #ffffff; /* white text for contrast */
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px; /* matching rounded edges */
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1rem;
    outline: none;
  }

  button:hover {
    background-color: #005999; /* slightly darker shade for hover effect */
  }

  button:active {
    background-color: #004266; /* even darker for active click effect */
  }
</style>
