"use client";

import { usePathname } from "next/navigation";
import CustomizePageHeader from "./CustomizePageHeader";
import Header from "./Header";

// ^ adjust import path to where your CustomizePageHeader lives

export default function HeaderSwitcher() {
  const pathname = usePathname();

  // match exactly /design/custom_design
  const isCustomizePage = pathname === "/design/custom_design";

  return isCustomizePage ? <CustomizePageHeader /> : <Header />;
}
