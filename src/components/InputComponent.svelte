<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let value;
  export let type = "number";
  export let isKeyboardVisible = false;
  export let placeholder = "";
  export let min = "0";
  export let pattern: string;
  export let inputmode;

  let inputEl;

  let initialScrollPosition;
  function handleDocumentClick(event) {
    if (inputEl && event.target !== inputEl) {
      inputEl.blur();
    }
  }

  function handleInputFocus() {
    initialScrollPosition = window.scrollY;
    const inputTop = inputEl.getBoundingClientRect().top;
    const offset = 50;
    window.scrollTo(0, inputTop + initialScrollPosition - offset);
  }

  function handleInputBlur() {
    window.scrollTo(0, initialScrollPosition);
  }

  onMount(() => {
    document.addEventListener("click", handleDocumentClick);

    inputEl.addEventListener("focus", handleInputFocus);
    inputEl.addEventListener("blur", handleInputBlur);

    return () => {
      inputEl.removeEventListener("focus", handleInputFocus);
      inputEl.removeEventListener("blur", handleInputBlur);
    };
  });

  onDestroy(() => {
    document.removeEventListener("click", handleDocumentClick);
  });
</script>

{#if type === "number"}
  <input
    bind:this={inputEl}
    type="number"
    bind:value
    {min}
    {pattern}
    {inputmode}
    {placeholder}
    class={isKeyboardVisible ? "keyboard-visible" : ""}
  />
{:else if type === "text"}
  <input
    bind:this={inputEl}
    type="text"
    bind:value
    {placeholder}
    class={isKeyboardVisible ? "keyboard-visible" : ""}
  />
{:else}
  <p>Unsupported input type.</p>
{/if}

<style>
  .keyboard-visible {
    margin-top: 50vh;
  }
  input {
    padding: 0.5rem 1rem;
    border: 1px solid #b3e0ff;
    border-radius: 5px;
    font-size: 1rem;
    width: 30%;
    box-sizing: border-box;
    margin-right: 0.5rem;
    outline: none;
  }

  input:focus {
    border-color: #007acc;
    box-shadow: 0 0 5px rgba(0, 122, 204, 0.5);
  }
</style>
