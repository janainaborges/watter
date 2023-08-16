<script lang="ts">
  export let value;
  export let type = "number"; 
  export let isKeyboardVisible = false;
  export let placeholder = ""; 
  export let min = "0";
  export let pattern: string; 
  export let inputmode; 
</script>

{#if type === 'number'}
<input
  type="number"
  bind:value={value}
  min={min}  
  pattern={pattern}  
  inputmode={inputmode}  
  placeholder={placeholder}
  class={isKeyboardVisible ? "keyboard-visible" : ""}
/>
{:else if type === 'text'}
<input
  type="text"
  bind:value={value}
  placeholder={placeholder}
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
