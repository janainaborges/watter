<script lang="ts">
  import { dailyWaterGoal } from './store.js';
</script>

<h2>Configurações</h2>
<label>
  Meta diária de água (ml):
  <input type="number" bind:value={$dailyWaterGoal} min="0" />
</label>

<!-- Mais configurações podem ser adicionadas aqui conforme necessário -->

