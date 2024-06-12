import { Pfp } from "@/components/component/pfp";
import { getIdByEmail } from "@/utils/helpers/get-by-mail";

export default async function Page() {
  const { userName } = await getIdByEmail();
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Pfp userName={userName} />
    </main>
  );
}
