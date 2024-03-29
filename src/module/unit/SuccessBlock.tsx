import { useContext } from "react";
import { useCopyToClipboard } from "usehooks-ts";


import { OFFICIAL_URL } from "@/../script/constant/index";
import { AppContext } from "@/../script/state/context/AppContext";
import { BsClipboard } from "react-icons/bs";
export const UnitSuccessBlock = ({
    newUID, loadings, s__confirmRedirect, confirmRedirect,
    s__redirectionTimeout,redirectionTimeout
}:any) => {
    const app:any = useContext(AppContext);
    const [clipbloardValue, clipbloard__do] = useCopyToClipboard()
    const copyToClipboard = ()=>{
        clipbloard__do(OFFICIAL_URL+"unit/"+newUID)
        app.alert("neutral","Copied to clipboard")
    }
    const stopRedirection = ()=>{
        clearTimeout(redirectionTimeout);
        s__confirmRedirect(false)
        window.stop()
    }

    
    return (
    <div className='  flex-col flex-align-center flex-justify-center   flex-1'>
        <div className='flex'>
            <div className='tx-lgx duno-badge-success mx-2  px-2 py-2 '>
                Success
            </div>
        
            {loadings == "" && newUID != "" && <>
                <div className='flex-center w-100'>
                    <div className='duno-badge-faded mx-2 flex-center opaci-chov--50 px-2 py-2 '
                        onClick={()=>{ copyToClipboard()}}
                    >   
                        <BsClipboard/>
                        <i className='px-1'></i>
                        {OFFICIAL_URL}{"unit/"+newUID}
                    </div>
                </div>
            </>}
        </div>

        <div className='flex mt-8 flex-align-end flex-justify-center'>
            <div className=' px-2 py-2 tx-lgx'>New Unit Created:    </div>
            <a className='duno-tx-link px-3 tx-xl underline duno-underline-link'
                href={OFFICIAL_URL+"unit/"+newUID}
            >
                    #{newUID}
            </a>
        </div>
        {confirmRedirect &&
            <div className=' px-2 py-2 tx-mdl opaci-75 flex-center'>
                <div className="spin-3">|</div>
                <div className="flex ml-3">
                    Redirecting to new unit #{newUID} (3s)...
                </div>
                <div className='duno-tx-link px-2 py-2 clickble'
                    onClick={()=>{stopRedirection()}}
                >
                    click here to cancel
                </div>
            </div>
        }   
    </div>
    )
}