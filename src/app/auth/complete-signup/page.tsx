import { Pfp } from "@/components/component/pfp";
import { getIdByEmail } from "@/utils/helpers/get-by-mail";
import { redirect } from "next/navigation";
import createClient from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <h1 className="text-center text-xl">
          Sign up successful check your email for the confirmation link to
          continue setting up your account.
        </h1>
      </main>
    );
  }

  const email = data?.user?.email;

  if (typeof email === "undefined") {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <h1 className="text-center text-xl">
          Sign up successful check your email for the confirmation link to
          continue setting up your account.
        </h1>
      </main>
    );
  }

  const { userName } = await getIdByEmail({ email });
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Pfp userName={userName} />
    </main>
  );
}
