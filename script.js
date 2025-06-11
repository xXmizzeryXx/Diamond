function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

function openApp(url) {
  window.location.href = url;
}

// Real battery support
function updateBatteryStatus(battery) {
  const level = Math.round(battery.level * 100);
  const charging = battery.charging;
  const icon = charging ? "⚡" : "🔋";
  document.getElementById('battery').textContent = `${icon} ${level}%`;
}

window.onload = () => {
  updateClock();
  setInterval(updateClock, 10000);

  // Battery API
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      updateBatteryStatus(battery);
      battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
      battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
    });
  } else {
    document.getElementById('battery').textContent = "🔋 N/A";
  }
};
