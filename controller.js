// PS5 (DualSense) Controller Overlay Script

function updateOverlay() {
  const gamepads = navigator.getGamepads();
  const gp = gamepads[0];

  // Remove all "pressed" classes first
  document.querySelectorAll('.pressed').forEach(el => el.classList.remove('pressed'));

  // Stick movement
  const leftStick = document.querySelector('.stick.left');
  const rightStick = document.querySelector('.stick.right');
  const maxMove = 20; // Max pixel movement from center

  if (gp) {
    // DualSense/PS5 mapping (standard mapping on browsers)
    // 0: Cross, 1: Circle, 2: Square, 3: Triangle
    // 4: L1, 5: R1, 6: L2, 7: R2
    // 8: Create (Share), 9: Options, 10: L3, 11: R3
    // 12: Dpad Up, 13: Dpad Down, 14: Dpad Left, 15: Dpad Right
    // 16: PS, 17: Touchpad

    // ABXY
    if (gp.buttons[0]?.pressed) document.querySelector('.button.a')?.classList.add('pressed');
    if (gp.buttons[1]?.pressed) document.querySelector('.button.b')?.classList.add('pressed');
    if (gp.buttons[2]?.pressed) document.querySelector('.button.x')?.classList.add('pressed');
    if (gp.buttons[3]?.pressed) document.querySelector('.button.y')?.classList.add('pressed');
    // Dpad
    if (gp.buttons[12]?.pressed) document.querySelector('.face.up')?.classList.add('pressed');
    if (gp.buttons[13]?.pressed) document.querySelector('.face.down')?.classList.add('pressed');
    if (gp.buttons[14]?.pressed) document.querySelector('.face.left')?.classList.add('pressed');
    if (gp.buttons[15]?.pressed) document.querySelector('.face.right')?.classList.add('pressed');
    // Bumpers & triggers
    if (gp.buttons[4]?.pressed) document.querySelector('.bumper.left')?.classList.add('pressed');
    if (gp.buttons[5]?.pressed) document.querySelector('.bumper.right')?.classList.add('pressed');
    if (gp.buttons[6]?.value > 0.1 || gp.buttons[6]?.pressed) document.querySelector('.trigger.left')?.classList.add('pressed');
    if (gp.buttons[7]?.value > 0.1 || gp.buttons[7]?.pressed) document.querySelector('.trigger.right')?.classList.add('pressed');
    // Sticks pressed
    if (gp.buttons[10]?.pressed) document.querySelector('.stick.left')?.classList.add('pressed', 'left');
    if (gp.buttons[11]?.pressed) document.querySelector('.stick.right')?.classList.add('pressed', 'right');
    // Share/Create and Options buttons
    if (gp.buttons[8]?.pressed) document.querySelector('.back')?.classList.add('pressed');
    if (gp.buttons[9]?.pressed) document.querySelector('.start')?.classList.add('pressed');
    // Touchpad
    if (gp.buttons[17]?.pressed) document.querySelector('.touchpad')?.classList.add('pressed');

    // Analog stick movement
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
    if (leftStick) leftStick.style.transform = 'translate(0px, 0px)';
    if (rightStick) rightStick.style.transform = 'translate(0px, 0px)';
  }
  requestAnimationFrame(updateOverlay);
}
window.addEventListener('gamepadconnected', () => requestAnimationFrame(updateOverlay));
