/// <reference types="vite/client" />

declare global {
  type Window = {
    Fabric: fabric.Canvas;
  };
}
