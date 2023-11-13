import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FirebaseProvider } from "./Firebase.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>
);
