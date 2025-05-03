"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import AppTheme from "../theme/AppTheme";

interface IProviders {
  disableCustomTheme?: boolean;
  children: React.ReactNode;
}

export function Providers({ children, disableCustomTheme }: IProviders) {
  return (
    <Provider store={store}>
      <AppTheme disableCustomTheme={disableCustomTheme}>{children}</AppTheme>
    </Provider>
  );
}
