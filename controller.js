// Interactive controller overlay for DualShock 4/DS4

const DS4_MAP = {
  a: 0, b: 1, x: 2, y: 3,
  l1: 4, r1: 5, l2: 6, r2: 7,
  share: 8, options: 9, l3: 10, r3: 11,
  dpadUp: 12, dpadDown: 13, dpadLeft: 14, dpadRight: 15,
  ps: 16, touch: 17,
};

function updateOverlay() {
  const gamepads = navigator.getGamepads();
  const gp = gamepads[0];

  // Remove all "pressed" classes first
  document.querySelectorAll('.pressed').forEach(el => el.classList.remove('pressed'));

  if (gp) {
    // ABXY
    if (gp.buttons[DS4_MAP.a]?.pressed) document.querySelector('.button.a')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.b]?.pressed) document.querySelector('.button.b')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.x]?.pressed) document.querySelector('.button.x')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.y]?.pressed) document.querySelector('.button.y')?.classList.add('pressed');
    // Dpad
    if (gp.buttons[DS4_MAP.dpadUp]?.pressed) document.querySelector('.face.up')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.dpadDown]?.pressed) document.querySelector('.face.down')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.dpadLeft]?.pressed) document.querySelector('.face.left')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.dpadRight]?.pressed) document.querySelector('.face.right')?.classList.add('pressed');
    // Bumpers & triggers
    if (gp.buttons[DS4_MAP.l1]?.pressed) document.querySelector('.bumper.left')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.r1]?.pressed) document.querySelector('.bumper.right')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.l2]?.value > 0.1) document.querySelector('.trigger.left')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.r2]?.value > 0.1) document.querySelector('.trigger.right')?.classList.add('pressed');
    // Sticks pressed
    if (gp.buttons[DS4_MAP.l3]?.pressed) document.querySelector('.stick.left')?.classList.add('pressed', 'left');
    if (gp.buttons[DS4_MAP.r3]?.pressed) document.querySelector('.stick.right')?.classList.add('pressed', 'right');
    // Share/Options buttons
    if (gp.buttons[DS4_MAP.share]?.pressed) document.querySelector('.back')?.classList.add('pressed');
    if (gp.buttons[DS4_MAP.options]?.pressed) document.querySelector('.start')?.classList.add('pressed');
    // Touchpad
    if (gp.buttons[DS4_MAP.touch]?.pressed) document.querySelector('.touchpad')?.classList.add('pressed');

    // Analog stick movement (for DS4/PS4 controller)
    // Left stick: axes[0] (X), axes[1] (Y)
    // Right stick: axes[2] (X), axes[3] (Y)
    const leftStick = document.querySelector('.stick.left');
    const rightStick = document.querySelector('.stick.right');
    const maxMove = 20; // Max pixels to move from center

    if (leftStick && gp.axes.length >= 2) {
      const lx = gp.axes[0] * maxMove;
      const ly = gp.axes[1] * maxMove;
      leftStick.style.transform = `translate(${lx}px, ${ly}px)`;
    }
    if (rightStick && gp.axes.length >= 4) {
      const rx = gp.axes[2] * maxMove;
      const ry = gp.axes[3] * maxMove;
      rightStick.style.transform = `translate(${rx}px, ${ry}px)`;
    }
  } else {
    // Reset stick positions if no gamepad
    document.querySelector('.stick.left')?.style.setProperty('transform', 'translate(0px, 0px)');
    document.querySelector('.stick.right')?.style.setProperty('transform', 'translate(0px, 0px)');
  }
  requestAnimationFrame(updateOverlay);
}
window.addEventListener('gamepadconnected', () => requestAnimationFrame(updateOverlay));
