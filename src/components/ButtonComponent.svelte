<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string = "Button";
  export let onClick: () => void = () => {};
  export let backgroundColor = "#272d4d"; 

  const dispatch = createEventDispatcher();

  function handleClick() {
    onClick();
    dispatch('click'); 
  }
</script>

<button on:click={handleClick} style="background-color: {backgroundColor}">{label}</button>

<style>
  button {
    color: #ffffff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1rem;
    outline: none;
  }
  button:hover {
    background-color: #005999;
  }
  button:active {
    background-color: #004266;
  }
</style>
