export const waitForUpdates = async (update: () => void): Promise<void> => {
  const ws = new WebSocket('ws://localhost:6789');

  ws.onerror = (e) => {
    console.log("Auto-reload websocket error", e);
  }

  ws.onmessage = (message) => {
    console.log('Auto-reload websocket update notification');
    update();
  };
};
