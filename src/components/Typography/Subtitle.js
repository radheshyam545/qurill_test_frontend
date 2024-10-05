 function Subtitle({styleClass, children}){
    return(
        <div className={` font-semibold ${styleClass}`}>{children}</div>
    )
}

export default Subtitle