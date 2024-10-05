import React, { useEffect } from 'react'

function LogOut() {
    localStorage.clear();
    window.location.href = '/'
}

export default LogOut
