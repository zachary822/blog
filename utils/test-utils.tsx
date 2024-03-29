import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

function ProviderWrapper({ children }: { children?: ReactElement }) {
  return <>{children}</>;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ProviderWrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
