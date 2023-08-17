<script lang="ts">
    export let text: string = "Default Text";
    export let forId: string = ""; 
  </script>
  
  <label for={forId}>{text}</label>
  
  <style>
    label {
      font-size: 1rem;
      margin-right: 10px;
    }
  </style>
  