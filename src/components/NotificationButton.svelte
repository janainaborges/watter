<script>
    export let max = 100;  
    export let current = 0;  
    export let color = "blue";  

    let percentage = (current / max) * 100;
</script>

<style>
    .progress-container {
        width: 100%;
        background-color: #f3f3f3;
        border-radius: 5px;
        overflow: hidden;
    }

    .progress-bar {
        height: 20px;
        width: 0;
        background-color: var(--color);
        transition: width 0.3s;
    }
</style>

<div class="progress-container">
    <div class="progress-bar" style="width: {percentage}%; --color: {color};"></div>
</div>

