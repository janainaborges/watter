<script lang="ts">
    export let text: string = "Default Text";
    export let forId: string = ""; // para vincular com um elemento de entrada, se necessário
  </script>
  
  <label for={forId}>{text}</label>
  
  <style>
    label {
      font-size: 1rem;
      margin-right: 10px;
    }
  </style>
  