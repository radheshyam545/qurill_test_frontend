import { useEffect} from "react"
import { useDispatch } from "react-redux"
import { setPageTitle, showNotification } from "../common/headerSlice"
import GettingStartedNav from "./components/GettingStartedNav"
import GettingStartedContent from "./components/GettingStartedContent"



function GettingStarted(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Documentation"}))
      }, [])


    return(
        <>
            <div className="bg-base-100  flex overflow-hidden  rounded-lg" style={{height : "82vh"}}>
                    <div className="flex-none p-4">
                        <GettingStartedNav activeIndex={1}/>
                    </div>

                    <div className="grow pt-16  overflow-y-scroll">
                        <GettingStartedContent />
                    </div>

                </div>
           
        </>
    )
}

export default GettingStarted