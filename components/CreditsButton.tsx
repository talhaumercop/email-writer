import ClaimCredits from "@/components/ClaimCredits";
import { auth } from "@/auth";

export default async function CreditsButton() {
  const session = await auth();
  
  return (
    <div>
      {/* ...other dashboard content... */}
      {session?.user?.id && <ClaimCredits userId={session.user.id} />}
    </div>
  );
}