import AuthModule from "@/components/auth-module";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-static";

export default async function page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    redirect("/");
  }

  return <AuthModule />;
}
