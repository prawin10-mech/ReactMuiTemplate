import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// theme
import ThemeProvider from "./theme";
import { ThemeSettings, SettingsProvider } from "./components/settings";
import { MotionLazyContainer } from "./components/animate";
import ThemeLocalization from "./locales";
import { store } from "./store";
import Router from "./routes";
import { AuthProvider } from "./auth/JwtContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <SettingsProvider>
            <BrowserRouter>
              <MotionLazyContainer>
                <ThemeProvider>
                  <ThemeLocalization>
                    <ThemeSettings>
                      <Router />
                    </ThemeSettings>
                  </ThemeLocalization>
                </ThemeProvider>
              </MotionLazyContainer>
            </BrowserRouter>
          </SettingsProvider>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
