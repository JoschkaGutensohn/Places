import { BrowserRouter as Router } from "react-router-dom";

import { MainNavigation, LoadingSpinner } from "./components";
import { AuthContext } from "./context/auth-context";

import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { Suspense } from "react";
import { AllRoutes } from "./routes/AllRoutes";

const App = () => {
  const { token, login, logout, userId } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <AllRoutes isLoggedin={!!token} />
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
