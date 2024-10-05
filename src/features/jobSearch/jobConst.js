export const filterValue=[
    { displayName: "Date Posted", id: "publishedSince", value: [{ value: "Last 24 hours", label: "Last 24 hours" },{ value: "Last 3 days", label: "Last 3 days" },{ value: "Last 7 days", label: "Last 7 days" },{ value: "Last 14 days", label: "Last 14 days" },
] }, { displayName: "Sort", id: "sort", value: [{ value: "asc", label: "Ascending" },{ value: "desc", label: "Descending" }] },
    { displayName: "Job Type", id: "jobType", value: [
        { value: "full_time", label: "Full-Time" },
        { value: "part_time", label: "Part-Time" },
        { value: "temporary", label: "Temporary" },
        { value: "internship", label: "Internship" }
    ]},
    
    // { displayName: "Rate", id: "rate", value: [{ value: "per_hour", label: "Per Hour" },{ value: "per_day", label: "Per Day" },{ value: "per_week", label: "Per Week" },{ value: "per_month", label: "Per Month" },{ value: "per_year", label: "Per Year" }] },
    { displayName: "Pay", id: "payRange", value: [{ value: 30000, label: "$30k+" },{ value: 40000, label: "$40k+" },{ value: 50000, label: "$50k+" },{ value: 60000, label: "$60k+" },{ value: 70000, label: "$70k+" },{ value: 80000, label: "$80k+" },{ value: 90000, label: "$90k+" },] },
    { displayName: "Experience Level", id: "experienceLevel", value: [
       { value: "entry_Level", label: "Entry Level" },{ value: "junior_Level", label: "Junior Level" },{ value: "mid_Level", label: "Mid Level" },{ value: "senior_Level", label: "Senior Level" },{ value: "lead_Principal", label: "Lead/Principal" },{ value: "executive_Level", label: "Executive Level" }]
},
    { displayName: "Job Mode", id: "mode", value: [
        { value: "remote", label: "Remote" },
        { value: "on_Site", label: "On Site" },
        { value: "hybrid", label: "Hybrid" }
    ]},
]
export const jobExperience = {
    'entry_Level': 'Entry Level',
    "junior_Level": "Junior Level",
    "mid_Level": "Mid Level",
    "senior_Level": "Senior Level",
    "lead_Principal": "Lead/Principal",
    "executive_Level": "Executive Level"
    
}
export const jobTyoeEnum = {
    'full_time': 'Full-Time',
    "part_time": "Part-Time",
    "temporary": "Temporary",
    "internship": "Internship"
}

export const rateUnitEnum = {
    "per_hour": "per hour" ,
    "per_day": "per day" ,
    "per_week": "per week" ,
    "per_month": "per month" ,
    "per_year": "per year" 
}

export const modeEnum = {
    "remote": "Remote" ,
     "on_Site": "On Site" ,
    "hybrid": "Hybrid" ,
}

export const statusEnum = {
    "draft": "Draft" ,
     "published": "Published" ,
    "unpublished": "Unpublished" ,
    'expired': 'Expired'

}
export const conturyEnum = {
    "usa": "USA"
}
export const typeEnum = {
    "inPerson": "In Person",
    "phone": "Phone",
    "video": "Video"
}
export const applicatnStatusEnum = {
    "applied": "Applied",
    "short-listed": "Shortlist",
    "screened": "Screened",
    "interview": "Interview",
    "offer": "Offer",
    "hire": "Hire"
}