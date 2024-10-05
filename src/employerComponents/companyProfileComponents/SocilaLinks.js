import React from 'react';

function SocialLinks({ socialLinks, onSocialLinksChange }) {
  return (
    <div className='mt-[20px]'>
      <h2 className='font-semibold text-[20px]'>Social Links</h2>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[15px] mt-[10px]'>
        <div>
          <label className="mb-1 font-[500]">Facebook URL</label>
          <input
            name="facebookURL"
            type="text"
            placeholder={"http://www.facebook.com"}
            className="w-full text-[15px] text-[#000] bg-[#FBFBFB] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
            value={socialLinks.facebookURL}
            onChange={(e) => onSocialLinksChange('facebookURL', e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 font-[500]">LinkedIn URL</label>
          <input
            name="linkedinURL"
            type="text"
            placeholder={"http://www.linkedin.com"}
            className="w-full text-[15px] text-[#000] bg-[#FBFBFB] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
            value={socialLinks.linkedinURL}
            onChange={(e) => onSocialLinksChange('linkedinURL', e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 font-[500]">Twitter URL</label>
          <input
            name="twitterURL"
            type="text"
            placeholder={"http://www.twitter.com"}
            className="w-full text-[15px] text-[#000] bg-[#FBFBFB] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
            value={socialLinks.twitterURL}
            onChange={(e) => onSocialLinksChange('twitterURL', e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 font-[500]">YouTube URL</label>
          <input
            name="youtubeURL"
            type="text"
            placeholder={"http://www.youtube.com"}
            className="w-full text-[15px] text-[#000] bg-[#FBFBFB] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
            value={socialLinks.youtubeURL}
            onChange={(e) => onSocialLinksChange('youtubeURL', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
