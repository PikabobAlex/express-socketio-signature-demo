import { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import FabricCanvas from "./FabricCanvas";
import { FirebaseContext, FirebaseFunctions } from "./Firebase";
function App() {
  const [socket, setSocket] = useState<Socket | null>();

  const canvasFabricRef = useRef<fabric.Canvas>();
  const firebaseContext = useContext(FirebaseContext) as FirebaseFunctions;

  useEffect(() => {
    console.log(canvasFabricRef.current);
  }, [canvasFabricRef]);
  useEffect(() => {
    const socket = io();
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    socket.on("message", (data) => {
      console.log(data);
    });
    socket.emit("signature", "hello");
    socket.on("received", () => {
      console.log("received");
    });
    setSocket(socket);
  }, []);
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center gap-4">
        <div className=" overflow-hidden rounded-2xl">
          <FabricCanvas ref={canvasFabricRef} />
        </div>
        <div className="flex gap-4">
          <button
            className=" shadow-sm bg-white w-24 h-12 rounded-md text-gray-700 font-semibold uppercase"
            onClick={() => {
              firebaseContext.UploadString!(
                canvasFabricRef.current!.toDataURL()
              ).then((url) => {
                console.log(url);
                socket?.emit("signature", { url });
              });
            }}
          >
            send
          </button>
          <button
            className=" shadow-sm bg-white w-24 h-12 rounded-md text-gray-700 font-semibold uppercase"
            onClick={() => {
              canvasFabricRef.current?.clear();
              canvasFabricRef.current?.setBackgroundColor("#7a7a7a", () => {
                canvasFabricRef.current?.renderAll();
              });
            }}
          >
            clear
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
