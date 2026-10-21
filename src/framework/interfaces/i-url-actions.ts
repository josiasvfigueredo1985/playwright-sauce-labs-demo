import type { IRoutablePage } from "./i-routable-page";

export interface IUrlActions {
  build(path: string): string;
  goto(target: IRoutablePage): Promise<void>;
  isAt(target: IRoutablePage): boolean;
  expect(target: IRoutablePage): Promise<void>;
}
