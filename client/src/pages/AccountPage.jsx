import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const AccountPage = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
        {/* {user} */}hi
    </div>
  )
}

export default AccountPage