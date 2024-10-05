import TemplatePointers from "./components/TemplatePointers"

function LandingIntro({heading, subHeading}) {

  return (
    <div className="hero min-h-full" style={{background: 'url(/assets/images/login-bg.png) center right no-repeat'}}>
      <div className="hero-content pt-[60px] pb-[150px]">
        <div className="max-w-md">

          <h1 className='text-[30px] text-center font-semibold mb-[100px]'><img src="/logo_1.png" className="w-[58px] h-[58px] inline-block mr-2 mask -mask-circle" alt="dashwind-logo" />Qruil</h1>
          <h2 className="text-[40px] text-center font-bold mb-[60px]" >{heading}</h2>
          <div className="text-center mb-[70px]">
            <img src="/assets/images/login-illus.svg" className="mx-auto"  alt="icon"/>
          </div>
          <p className="text-[20px] text-center font-normal w-8/12 mx-auto">{subHeading}</p>

          {/* Importing pointers component */}
          {/* <TemplatePointers /> */}

        </div>

      </div>
    </div>
  )

}

export default LandingIntro