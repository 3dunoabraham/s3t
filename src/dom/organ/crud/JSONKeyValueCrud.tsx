import { useRef, useState } from "react"


import ItemsTable from "@/dom/cell/table/ItemsTable"
import SETTINGS_JSON from '@/../script/constant/json/settings.json'
import { useIsClient, useLocalStorage } from "usehooks-ts"
import JSONKeyValueCrudForm from "@/dom/organ/crud/JSONKeyValueCrudForm"

export default function Component ({keyName, queriedObj, keyConfig, deleteUnit }:any) {
    const keyProperty = "key"
    const $jsonCrudForm:any = useRef()
    const DEFAULT_DB = {[keyName]:[]}
    const [LS_crud, s__LS_crud] = useLocalStorage('crud', JSON.stringify(DEFAULT_DB) )
    const settings:any = SETTINGS_JSON
    const theJsonArray = JSON.parse(LS_crud)[keyName]
    const [selectedItemIndex, s__selectedItemIndex] = useState(-1)
    const isClient = useIsClient()
    const tableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Key",fieldName:"key"},
        },
    }
    const compactTableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Key",fieldName:"key"},
            col2:{title:"Value",fieldName:"value",},
        },
    }
    const nestedTableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Key",fieldName:"key"},
            col2:{title:"Title",fieldName:"title"},
        },
    }
    const updateSelectedColName = (colName:any) => {
        $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{colName: colName}})
    }
    const updateSelectedArray = (id:any) => {
        let foundItemArray = queriedObj[keyName].findIndex((x:any,i:any) => {return x.id == id})
        s__selectedItemIndex(foundItemArray)
        $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{id: id}})        
    }



    return (<>
    <div className="flex-col flex-1 w-100 flex-align-stretch">
        <div className="flex flex-align-end">
            <h2 className=" tx-bold-5 flex-1 ">
                JSON CRUD  
            </h2>                        
            <div className=" tx-bold-3 opaci-50 tx-end tx-sm w-max-250px flex-col flex-align-end">
                <div className=" tx-bold-6 opaci-75 tx-sm"> {keyConfig[keyName].baseUrl}</div>
            </div>
        </div>
        <hr className="my-2"/>
        {!(keyName in queriedObj) && <div className='tx-xl opaci-10'> KEY NOT FOUND </div> }
        {keyName in queriedObj && keyName in settings &&
            <ItemsTable  displayConfigObj={tableConfigObj} boolConfig={["isActionable", "isSelectable", "isCompact"]} 
                updateSelectedArray={updateSelectedArray}
                actionCard={(id:any)=>(
                    <button className={`duno-button-faded  tx-green block `}
                        onClick={async (evt)=>{
                            deleteUnit(id)
                        }}
                    >
                        <span className="">Delete Unit</span>
                    </button>
                )}
                theArray={settings[keyName]} urlBase="/user/" 
            /> 
        }                    
    </div>
    {isClient && 
        <div className="flex-col flex-1 w-100 flex-align-stretch">
            <div className="flex flex-align-end gap-2">
                <h2 className=" tx-bold-5 flex-1 "> JSON</h2>
                <div className=" tx-bold-3 opaci-50 tx-sm w-max-300px"> Hardcoded JSON file inside project files</div>
            </div>
            <hr className="my-2"/>
            {isClient && keyName in settings &&
                <ItemsTable  displayConfigObj={compactTableConfigObj} boolConfig={["isCompact","isSelectable"]}
                    
                    updateSelectedArray={updateSelectedArray}
                    theArray={settings[keyName]} urlBase="/user/"  
                />
            }            
            {keyName in settings && selectedItemIndex > -1 && <>
                <div className="tx-lg tx-bold-5 mb-1 mt-6">Item: {settings[keyName][selectedItemIndex][keyProperty]}</div>
                <hr className="my-2"/>
                {!settings[keyName][selectedItemIndex].colVal && 
                    <div className="flex opaci-25 mb-8">
                        No nested value
                    </div>
                }
                {!!settings[keyName][selectedItemIndex].colVal && 
                    <ItemsTable  displayConfigObj={nestedTableConfigObj} boolConfig={["isCompact"]}
                        updateSelectedArray={updateSelectedArray}
                        theArray={
                            Object.keys(JSON.parse(settings[keyName][selectedItemIndex].colVal))
                                .map((x,i)=>({id:i,[keyProperty]:x,title:JSON.parse(settings[keyName][selectedItemIndex].colVal)[x]}))
                        } 
                        urlBase="/user/"  
                    />
                }
                {!!settings[keyName][selectedItemIndex].colVal &&
                    <div className="flex gap-1 ma-2">
                        {Object.keys(JSON.parse(settings[keyName][selectedItemIndex].colVal)).map((anItem:any, index:any) => {
                            return (
                                <div className="px-2 py-1 bg-b-20 bord-r-8 opaci-chov--50" key={index}
                                    onClick={()=>{updateSelectedColName(anItem)}}
                                >
                                    {anItem}
                                </div>
                            )
                        })}
                    </div>
                }
            </>}
            <hr className="my-2"/>
            <div className="flex Q_xs_lg_flex-col gap-1 my-2">
                    <JSONKeyValueCrudForm {...{ theUrl:keyConfig[keyName].baseUrl,  
                        masterKeyName: keyName, backup: theJsonArray, queriedArray: queriedObj[keyName]
                    }} ref={$jsonCrudForm} keyProperty={keyProperty} />
            </div>
            {theJsonArray && theJsonArray.length > 0 && <div className=" opaci-50 tx-end"> *Backup from Local Storage </div> }
        </div>
    }    
    </>)
}

