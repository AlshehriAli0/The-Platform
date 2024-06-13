import React from "react";
import createClient from "@/utils/supabase/server";
export default async function SignOutBtn() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return <div>Sign Out</div>;
}
