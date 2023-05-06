"use client";
import FlexTable from "@/dom/cell/form/FlexTable"
import ContextConnectedTable from "./ContextConnectedTable"
import Dropdown from "@/dom/atom/common/Dropdown"
import Link from "next/link"
import { useMemo } from "react";

function Component ({initArray}:any) {
    
  const buttonActionText = "..."
  const buttonActionClass = "tx-lg pb-3 pt-1 px-2 tx-gray opaci-chov--25"
  const actionCard = (id:any) => {
    const foundIndex = useMemo(()=>{
        return initArray.findIndex((item:any)=>(item.id == id))+1
    },[initArray])

        return (<>
          <Dropdown buttonTitle={buttonActionText} buttonClass={buttonActionClass}>
            <div className="flex-col flex-align-stretch gap-1 bg-white pa-2 bord-r-8 z-100  ">
              <Link  href={`unit/${id}`} className="ims-button-primary clickble nowrap"
                onClick={()=>{}}
              >
                View Details
              </Link>
              {!!foundIndex && <>
                {!!initArray[foundIndex-1].url &&<>
                    <Link  href={initArray[foundIndex-1].url || ""} className="ims-button-faded clickble nowrap"
                        target="_blank"
                        // onClick={()=>{s__loading(id)}}
                    >
                        {initArray[foundIndex-1].category == "game" && <>Play Game</>}
                        {initArray[foundIndex-1].category == "art" && <>View Project</>}
                        {initArray[foundIndex-1].category == "code" && <>View Demo</>}
                        
                    </Link>
                </>}
              </>}
            </div>
          </Dropdown>
        </>)
      }

    return (<>
        {/* @ ts-expect-error */}
        {/* <ContextConnectedTable initArray={initArray} /> */}
        
        <FlexTable theArray={initArray} bools={["isActionable",/* "isRowSelectable" */]} actionCard={actionCard} 
        actionHeader={<div className={buttonActionClass}>{buttonActionText}</div>}
                config={{idKey:"id",mainKey:"id",
                    headerClass:"tx-sm tx-gray tx-bold-3 ",
                    childrenArray: [
                        // { key: "name", title: "Name"},
                        { key: "category", title: "Category", class:""},
                        { key: "title", title: "Title"},
                    ]
                }}
            />
    </>)
}

 export default Component