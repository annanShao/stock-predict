import router from "./router";
import { RouterProvider } from "react-router-dom";
import React from "react";

function App() {
  return (
    <React.Suspense fallback={null}>
      {<RouterProvider router={router} />}
    </React.Suspense>
  );
}

export default App;
