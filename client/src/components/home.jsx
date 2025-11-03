import { useUser, useAuth, RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth(); // 👈 get the Clerk JWT

  useEffect(() => {
    const saveUser = async () => {
      const token = await getToken(); // ✅ get the token from Clerk

      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      await fetch("http://localhost:5000/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ send real token, not user.id
        },
        body: JSON.stringify(userData),
      });
    };

    if (isSignedIn && user) {
      saveUser();
    }
  }, [isSignedIn, user, getToken]);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <SignedIn>
        <h2>Welcome 👋 {user?.firstName}</h2>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
