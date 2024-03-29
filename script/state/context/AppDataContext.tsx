"use client";
import React, { createContext, FC, useContext, useEffect, useState } from "react";


export const AppData = createContext<IAppDataContext | null>(null);

const AppDataProvider:any = (props:any) => {
  const { children } = props;

  const asd = () => {

  }
  return (
    <AppData.Provider value={{asd}}>
      {children}
    </AppData.Provider>
  );
};

export const useAppData = () => useContext(AppData) as IAppDataContext;

export default AppDataProvider;

export interface ILoginForm {
  email?: string;
  password?: string;
}
export interface IUser {
  email: string;
  name: string;
}

interface IAppDataContext {
}
