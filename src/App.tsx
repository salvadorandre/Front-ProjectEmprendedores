import {RouterProvider} from "react-router-dom";
import {router} from "./app/router";
import {QueryProvider} from "./app/providers/QueryProvider";

export const App =() => {
  return(
    <QueryProvider>
      <RouterProvider router = {router}/>
    </QueryProvider>
  );
};