import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "../App";
import store from "../redux/store";

test("renders Budget control app text", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Budget control app/i);
  expect(linkElement).toBeInTheDocument();
});
