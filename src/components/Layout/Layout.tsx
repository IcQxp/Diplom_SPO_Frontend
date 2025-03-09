import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export const Layout: FC = () => {

    
    return(
        <>
        {
          location.pathname !== "/Auth" &&
          location.pathname !== "/auth" && <Header  />}
        <Outlet />
      </>
    )
}