"use client";
import { useMap } from 'usehooks-ts';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { DEFAULT_ALERT_MAPARRAY, INSTITUTION } from "@/../script/constant";
import { AppContext } from "@/../script/state/context/AppContext";
import AlertContainer from '@/dom/atom/common/AlertContainer';
import { useNavigationEvent } from '@/../script/util/hook/useNavigationEvent';
import { InventoryProvider } from '@/../script/state/context/InventoryContext';

function Component({ children, }: { children: React.ReactElement }) {
  const searchParams:any = useSearchParams();
  const queryClient = new QueryClient()
  const [filters,s__filters] = useState({})
  const [alertMap,alertMap__do] = useMap<string,any>(DEFAULT_ALERT_MAPARRAY)
  const [sidebarLinks,s__sidebarLinks] = useState([])
  const [sidebarPages,s__sidebarPages] = useState([])
  const alertNotification = (category="neutral", msg="")=>{
  alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
      setTimeout(()=>{alertMap__do.set(category, msg)},100)
  }
  let appValue:any = useMemo(()=>{
    return {
      institution: INSTITUTION,
      THEME: {
        primaryColor: "#3E5F58",
        textColorLight: "#ffffff"
      },
      online: searchParams.offline == undefined,
      query: searchParams,
      filters,s__filters,unfilter:(key:any)=>{
          let newObj:any = {...filters}
          delete newObj[key]
          s__filters(newObj)
      },
      sidebarLinks,s__sidebarLinks,
      sidebarPages,s__sidebarPages,
      alertMap,alertMap__do,
      alertReset:()=>{alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)},
      alert:(category:any, msg:any)=>{ alertNotification(category, msg) }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[alertMap, filters, searchParams,sidebarLinks, sidebarPages])

  return (
    <AppContext.Provider value={appValue}>
      <QueryClientProvider client={queryClient}>
        <InventoryProvider>
          {children}        
          <div>
            <AlertContainer {...{ s__msg: (val:any)=>(alertMap__do.set("neutral", val)), msg:alertMap.get("neutral")}} />
            <AlertContainer {...{ s__msg: (val:any)=>(alertMap__do.set("success", val)), msg:alertMap.get("success")}}
                badgeClass="duno-badge-success"
            />
            <AlertContainer {...{
                s__msg: (val:any)=>(alertMap__do.set("warn", val)), msg:alertMap.get("warn")}}
                badgeClass="duno-badge-secondary" 
            />
            <AlertContainer {...{
                s__msg: (val:any)=>(alertMap__do.set("error", val)), msg:alertMap.get("error")}}
                badgeClass="duno-badge-error" 
            />
          </div>
        </InventoryProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  )
}

export default Component;