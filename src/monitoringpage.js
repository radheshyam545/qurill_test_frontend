import React from 'react'
import './monitoringpage.css';
function Monitoringpage() {
  return (
    <div >
      <div className='section1' style={{ backgroundImage: 'url("/assets/images/WhatsApp Image 2024-04-14 at 12.12.35 AM.jpeg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <header className='headerStrip bg-[darkblue] w-full flex justify-center items-center p-2 text-white'><strong className='qurill'>QURILL'S</strong>&nbsp; thank you for signing up</header>
        <div className='section1Cont'>
          <div className='section1InnerCont'>
            <h4 className='hd1'>DONT LEAVE YOUR FRIENDS BEHIND</h4>
            <h2 className='hd2'>INVITE FRIENDS &<br /> EARN PRODUCTS</h2>
            <p className='para1'>
              share your unique link ia email, facebook<br /> or X and earn qurill bonus for<br /> each friend who signs up
            </p>
            <div className='linkbox'>
              httpsa/linktonewride
            </div>
            <div className='appLinks'>
              <button className='facebookIcon'><img src='/assets/images/facebookIcon.svg' className='h-full w-full' /></button>
              <div className='medium'>|</div>
              <button className='XIcon'><img src='/assets/images/XIcon.svg' className='h-full w-full' /></button>
            </div>
          </div>
        </div>
      </div>
      {/* //////////////////////////////////////////////////////////////////////////////////////// */}
      <div className='section2'>
        <div>
          <header>
            HERE'S HOW IT WORKS
          </header>
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className='progressBarOuterSection'>
            <div className='progressBarInnerSection'>
              <div className='firstRow'>
                <label>FRIENDS JOINED</label>
                <p>5</p>
                <p>10</p>
                <p>25</p>
                <p>50</p>
                <p>100</p>
                <p>200</p>
              </div>
              <div className='progressBarOuterDi'>

                <span className='active'></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>
              <div className='lastRow'>
                <label>QURILL BONUSES</label>
                <p>50 Applications</p>
                <p>100 Applications</p>
                <p>2 free months</p>
                <p>3 free months</p>
                <p>6 free months</p>
                <p style={{}}>1 free year</p>
              </div>
            </div>
          </div>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className='footer'>

  <p className='para1'><span style={{color:'orange'}}>No</span>&nbsp; friends have joined...Yet</p>
<p className='para2'>Keep checking</p>

        </div>
        </div>
      </div>
    </div>
  )
}

export default Monitoringpage;
