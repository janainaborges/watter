<script>
    import { historyStore } from './store'; 
</script>

<ul>
    {#each Object.entries($historyStore) as [date, records]}
        <li>
            <strong>{date}</strong>:
            {#each records.water as amount (amount)}
                {amount}ml,
            {/each}
            {records.water.length} pausas
        </li>
    {/each}
</ul>