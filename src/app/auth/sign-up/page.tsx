import AuthModule from "@/components/auth-module";
import React from "react";

export const dynamic = "force-static";

export default async function page() {
  return( <AuthModule />);
}
