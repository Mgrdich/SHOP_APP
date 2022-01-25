import {Provider} from "react-redux";
import store from "./store";
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator/>
    </Provider>
  );
}