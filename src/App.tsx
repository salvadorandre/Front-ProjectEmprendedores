import {RouterProvider} from "react-router-dom";
import {router} from "./app/router";
import {QueryProvider} from "./app/providers/QueryProvider";
import {GoogleOAuthProvider} from "@react-oauth/google";

export const App =() => {
  return(
    <GoogleOAuthProvider clientId="138247042851-j2sct7p88iagiciuct8p52o35u7gs1bb.apps.googleusercontent.com">
      <QueryProvider>
        <RouterProvider router = {router}/>
      </QueryProvider>
    </GoogleOAuthProvider>
  );
};