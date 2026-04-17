import { SignIn, SignedOut } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignedOut>
      <SignIn />
    </SignedOut>
  );
}