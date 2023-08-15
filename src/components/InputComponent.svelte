<script>
  export let value;
  export let isKeyboardVisible = false;
</script>

<input
  type="number"
  bind:value
  min="0"
  pattern="\d*"
  inputmode="numeric"
  class={isKeyboardVisible ? "keyboard-visible" : ""}
/>

<style>
  .keyboard-visible {
    margin-top: 50vh;
  }
  input {
    padding: 0.5rem 1rem;
    border: 1px solid #b3e0ff; /* light blue border */
    border-radius: 5px; /* rounded edges */
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    margin-right: 0.5rem;
    outline: none;
  }

  input:focus {
    border-color: #007acc; /* darker blue border for focus */
    box-shadow: 0 0 5px rgba(0, 122, 204, 0.5); /* subtle glow on focus */
  }
</style>
