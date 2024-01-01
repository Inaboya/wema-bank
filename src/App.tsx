import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { coreRoutes } from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import SignUp2 from "./pages/Auth/SignUp2";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup-2" element={<SignUp2 />} />
      <Route path="/sign-in" element={<SignIn />} />

      <Route path="/dashboard" element={<DefaultLayout />}>
        {coreRoutes.map(({ path, component: Component }, index) => (
          <Route
            path={path}
            key={index}
            element={
              <Suspense>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
