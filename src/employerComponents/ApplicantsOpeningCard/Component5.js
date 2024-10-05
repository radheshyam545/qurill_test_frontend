import React from 'react';

function Component5({ showHide, selectedApplicantData = {} }) {
  const { portfolio = {} } = selectedApplicantData;


  const handleProjectClick = (projectUrl) => {
    if (projectUrl) {
      window.open(projectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className='border border-[#919191] px-[20px] py-[20px] rounded-[12px] border-[2px] mt-[20px] grid grid-cols-2 gap-[20px]'>
      <div>
        <p className='font-[700] text-[17px] text-[#1E1E1E] mb-[10px]'>Portfolio</p>

        {showHide?.cv && (
          <div className='mb-[10px]'>
            <label className='font-[500] text-[14px]' htmlFor="resume-cv">CV/Resume</label>
            <div>
              {portfolio?.resume ? (
                <a
                  target='_blank'
                  href={portfolio.resume}
                  className='cursor-pointer text-[15px] px-[10px] py-[5px] bg-[#EFEFEF] border border-[#919191] inline-block'
                  download
                >
                  Download resume CV
                </a>
              ) : (
                <p className='ml-[2px] text-[14px] text-[#9c9292]'>Resume was not uploaded</p>
              )}
            </div>
          </div>
        )}

        {showHide?.coverLetter && (
          <div className='mb-[10px]'>
            <label className='font-[500] text-[14px]' htmlFor="upload-cover-letter">Cover letter</label>
            <div>
              {portfolio?.coverLetter ? (
                <a
                  href={portfolio.coverLetter}
                  className='cursor-pointer text-[15px] px-[10px] py-[5px] bg-[#EFEFEF] border border-[#919191] inline-block'
                  download
                >
                  Download Cover Letter
                </a>
              ) : (
                <p className='ml-[1px] text-[14px] text-[#9c9292]'>Cover letter was not uploaded</p>
              )}
            </div>
          </div>
        )}

        {showHide?.websiteUrls && (
          <div className='mb-[10px]'>
            <label className='font-[500] text-[14px]' htmlFor="website-url">Website URL</label>
            <div>
              {portfolio.website ? (
                <a
                  className='text-blue-500 hover:underline'
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {portfolio.website}
                </a>
              ) : (
                <p className='ml-[1px] text-[14px] text-[#9c9292]'>Website URL was not provided</p>
              )}
            </div>
          </div>
        )}

        {showHide?.Certifications && (
          <div className='mb-[10px]'>
            <label className='font-[500] text-[14px]'>Certifications</label>
            <div>
              {portfolio?.certifications?.length > 0 ? (
                <ul className='list-disc pl-[20px]'>
                  {portfolio.certifications.map((item, index) => (
                    <li className='text-[#9c9292] text-[14px]' key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className='ml-[6px] text-[14px]'>Certifications were not uploaded</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        {showHide?.projects ? (
          <div>
            <label className='font-[500] text-[14px]'>Projects</label>
            {portfolio?.projects && portfolio.projects?.length > 0 ? (
              <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border border-[1px] border-[#d8d8d8] w-[350px] h-auto overflow-hidden">
                {portfolio?.projects.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt={`Project Image ${index + 1}`}
                    className="w-[60px] h-[80px] cursor-pointer hover:scale-[1.05] mt-[3px] ml-[3px] mb-[4px] duration-[0.3s] object-contain"
                    onClick={() => handleProjectClick(item)}
                  />
                ))}
              </div>
            ) : (
              <p className='ml-[1px] text-[14px] text-[#9c9292]'>Project was not provided</p>
            )}
          </div>
        ) : null}
      </div>

    </div>
  );
}

export default Component5;
