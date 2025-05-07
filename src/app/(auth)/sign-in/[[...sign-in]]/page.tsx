import { SignIn } from '@clerk/nextjs'

function page() {
  return(
    <div className=" flex items-center h-screen justify-center">
  <SignIn />
  </div>
)
}

export default page
