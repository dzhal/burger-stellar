//libs
import { createContext } from "react";
//helpers
import { DataContextType } from "../@type/types";

export const ConstructorDataContext = createContext<DataContextType>({
  constructorData: [],
  setСonstructorData: () => {},
});
