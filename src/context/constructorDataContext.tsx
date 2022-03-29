import { createContext } from "react";
import { DataContextType } from "../@type/types";

export const ConstructorDataContext = createContext<DataContextType>({
  constructorData: [],
  setСonstructorData: () => {},
});
