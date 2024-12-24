import { useContext } from "react";
import { SystemContext } from "./SystemContext.jsx"; // 請確定路徑正確

export const useSystemContext = () => useContext(SystemContext);
