import { fabric } from "fabric";
import { forwardRef, useEffect, useRef } from "react";
const FabricCanvas = forwardRef<any, any>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasFabricRef = useRef<fabric.Canvas>();
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current!, {
        isDrawingMode: true,
        selection: false,
        width: 300,
        height: 300,
        backgroundColor: "#7a7a7a",
      });
      canvas.freeDrawingBrush.width = 10;
      canvas.freeDrawingBrush.color = "black";
      canvasFabricRef.current = canvas;
      console.log(canvasFabricRef.current);
      (ref as React.MutableRefObject<fabric.Canvas>)!.current =
        canvasFabricRef.current;
    }
  }, []);

  return <canvas ref={canvasRef}></canvas>;
});

export default FabricCanvas;
