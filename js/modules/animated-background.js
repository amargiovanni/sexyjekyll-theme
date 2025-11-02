// =======================
// Animated Background Module
// =======================

export function initAnimatedBackground() {
  const blobs = document.querySelectorAll('.gradient-blob');

  // Add mouse move parallax effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed * 50;
      const y = (mouseY - 0.5) * speed * 50;

      blob.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Add random color shift over time
  function shiftColors() {
    const colors = [
      { name: 'purple', value: '#a855f7' },
      { name: 'pink', value: '#ec4899' },
      { name: 'blue', value: '#3b82f6' },
      { name: 'cyan', value: '#06b6d4' },
      { name: 'orange', value: '#f97316' },
      { name: 'yellow', value: '#facc15' },
    ];

    blobs.forEach((blob) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Subtle color changes without jarring transitions
      if (Math.random() > 0.7) {
        blob.style.background = `radial-gradient(circle, ${randomColor.value} 0%, transparent 70%)`;
      }
    });
  }

  // Shift colors every 10 seconds
  setInterval(shiftColors, 10000);
}
