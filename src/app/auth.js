import { USER_ROLE } from "./enums";

const checkAuth = () => {
  const TOKEN = localStorage.getItem("token");
  const ROLE = localStorage.getItem("role");
  const status = localStorage.getItem("Status");
  const user = USER_ROLE[ROLE];
  
  const PUBLIC_ROUTES = ["login", "forgot-password", "register", "EmailVerification", "new-password", "emailverification-permotion", "landing"];
  
  const userType = {
    SEEKER: 'seeker',
    EMPLOYER: 'employer'
  };
  
  const isPublicPage = PUBLIC_ROUTES.some(r => window.location.href.includes(r));
  const EmployeeInactiveStatus = ['draft', 'pending', 'rejected']

  if (!TOKEN && !isPublicPage) {
    // Redirect to login if token is not present and it's not a public page
    window.location.href = '/login';
  } else if (TOKEN && isPublicPage) {
    // Redirect away from public pages if logged in
    if (user === 'EMPLOYER' && EmployeeInactiveStatus.includes(status) // (status === 'draft' || status === 'pending' || status === 'rejected')
      ) 
      {
      window.location.href = `${userType[user]}/legitimacy-checkpoint`;
    } else if (user === 'EMPLOYER' && status === "approved") {
      window.location.href = `${userType[user]}/dashboard`;
    }
    else if(user === 'SEEKER'){
      window.location.href = `${userType[user]}/dashboard`;
    }

  } else if (TOKEN && !user) {
    // Clear local storage and redirect to login if user role is not recognized
    localStorage.clear();
    window.location.href = '/login';
  } else {
    // Return token, user, and status if authenticated
    return { token: TOKEN, user: user, status: status };
  }
};

export default checkAuth;
