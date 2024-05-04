// theme
import ThemeProvider from "./theme";
import { ThemeSettings, SettingsProvider } from "./components/settings";
import { MotionLazyContainer } from "./components/animate";
import ThemeLocalization from "./locales";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <>
      Hello
      <Provider store={store}>
        <SettingsProvider>
          <MotionLazyContainer>
            <ThemeProvider>
              <ThemeLocalization>
                <ThemeSettings>Hello</ThemeSettings>
              </ThemeLocalization>
            </ThemeProvider>
          </MotionLazyContainer>
        </SettingsProvider>
      </Provider>
    </>
  );
}

export default App;
