import { Pfp } from "@/components/component/pfp";
import { getIdByEmail } from "@/utils/helpers/get-by-mail";
import { redirect } from "next/navigation";
import createClient from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/sign-up");
  }

  const email = data?.user?.email;

  if (typeof email === "undefined") {
    redirect("/auth/sign-up");
  }

  const { userName } = await getIdByEmail({ email });
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Pfp userName={userName} />
    </main>
  );
}
