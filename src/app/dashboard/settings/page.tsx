import { UserProfile } from "@clerk/nextjs"

function Settings() {
  return (
    <div className=" flex justify-center items-center h-full my-10 px-5">
        <UserProfile/>
      
    </div>
  )
}

export default Settings
