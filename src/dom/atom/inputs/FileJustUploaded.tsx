import { BsTrash, BsCloudArrowDown, BsExclamationTriangle } from 'react-icons/bs'
import { AiOutlineLoading } from 'react-icons/ai'


import { STATIC_DOC_BASE } from '@/../script/constant/index'
import Link from 'next/link'
// ReactFunctionComponent
export const FileJustUploaded = ({
    cat, fileId="", 
    validatedFileType,foundFilename,date,
    percentComplete = 101,
    handleDelete = (category:any, theFile:any)=>{}, handleDownload = (category:any, theFile:any)=>{},
}:any)=>{
    return (
    <div className="  w-100" >
        <div className="flex-justify-between flex w-100" > 
            <div className="flex-1 flex-col flex-align-start noverflow ">
                <Link href={percentComplete < 100 ? "#" :  `${STATIC_DOC_BASE}${foundFilename}`}
                    target={percentComplete < 100 ? "" : "_blank"} rel="noreferrer"
                    className="duno-tx-primary opaci-chov--50 underline tx-bold-5 duno-underline-primary"  
                >
                    {foundFilename}
                </Link>
            </div>
            <div className=" duno-tx-faded  px-2" >{date}</div>
            {(foundFilename == "loading..." )  && <div className="spin-1 " ><AiOutlineLoading /></div>}
            {(foundFilename != "loading..." )  &&
                <div className="flex duno-tx-faded tx-lg tx-bold-5 " >
                    <div className="px-1 opaci-chov--50" onClick={()=>{handleDelete(cat,{id:fileId})}}>
                        <BsTrash />
                    </div>
                    <Link
                        href={percentComplete < 100 ? "#" :  `${STATIC_DOC_BASE}${foundFilename}`}
                        download={`${foundFilename}`} target="_blank" rel="noreferrer"
                        className="px-1 opaci-chov--50"  
                    >
                        <BsCloudArrowDown />
                    </Link>
                    
                </div>
            }
        </div>
        {!(foundFilename != "loading..." || percentComplete == 100) && 
            <div className="flex-center" > 
                <div className="flex-1  bg-b-20 bord-r-25">
                    <div className="duno-bg-primary bord-r-25 py-1"
                        style={{width:parseInt(`${percentComplete}`)+"%"}}
                    >
                    </div>
                </div>
                <div className="tx-mdl pl-2" > {parseInt(`${percentComplete}`)}%</div>
                {!validatedFileType && 
                    <div className="pl-3 tx-lgx tx-red" title="Wrong Extension"> <BsExclamationTriangle /></div>
                }
            </div>
        }
    </div>
    )
}