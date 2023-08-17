<script>
  export let percentage = 0;
</script>

<div class="circle-container">
  <svg viewBox="0 0 36 36" class="circular-chart">
    <path
      class="circle-bg"
      d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      class="circle"
      stroke-dasharray="{percentage}, 100"
      d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
    />
  </svg>
  <div class="circle-text">{percentage}%</div>
</div>

<style>
  .circle-container {
    position: relative;
    width: 100px;
    height: 100px;
  }

  .circular-chart {
    display: block;
    width: 100%;
    max-width: 250px;
  }

  .circle-bg {
    fill: none;
    stroke: #f5f5f5;
    stroke-width: 3.8;
  }

  .circle {
    fill: none;
    stroke: #053b58;
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
  }

  @keyframes progress {
    0% {
      stroke-dasharray: 0, 100;
    }
  }

  .circle-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
  }
</style>
