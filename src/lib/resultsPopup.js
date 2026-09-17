import { createContext, useContext } from "react";

// Open/close state for the results popup.
//
// The popup is mounted once in App, above the router, so it keeps its state
// across navigation and cannot be torn down by a route change mid-animation.
// The pill that reopens it lives in Navbar, which every page renders for
// itself. A context is what spans those two without either one having to own
// the other, or the popup having to be repeated on all eight pages.
export const ResultsPopupContext = createContext(null);

export function useResultsPopup() {
  return useContext(ResultsPopupContext);
}
