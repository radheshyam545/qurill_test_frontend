import React from 'react';
import NewsCard from '../../components/NewsCard';

function News() {
  return (
    <>
        <div className=' rounded-xl  bg-white p-[30px] padding-10px'>
       <h1 className='w-full h-8 text-[26px] font-semibold mb-4'>News</h1>
       <div className='  grid lg:grid-cols-2 '>
       <NewsCard image={'/assets/images/news-card.svg'} disciption={"The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge in Selma, Alabama, where he helped lead a march for voting rights in 1965."}/>
       <NewsCard image={'/assets/images/tornado.svg'} disciption={"Solemn crowds watch as Lewis, who died earlier this month at the age of 80, is borne by caisson over Edmund Pettus Bridge"}/>
       <NewsCard image={'/assets/images/horses.svg'} disciption={"The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge in Selma, Alabama, where he helped lead a march for voting rights in 1965."}/>
       <NewsCard image={'/assets/images/homedecor.svg'} disciption={"This month marks the 20th anniversary of the Power Mac G4 Cube, which debuted July 19, 2000. It also marks the 19th anniversary of Apple’s announcement that it was putting the Cube on ice."}   />
       {/* <NewsCard image={'/assets/images/tornado.svg'}/>
       <NewsCard image={'/assets/images/news-card.svg'}/> */}
       </div>
    </div>
    </>
  );
}

export default News;
// h-[490px] w-[400px] 
// gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', display:'grid', gridTemplateRows:'repeat(auto, 400px)'