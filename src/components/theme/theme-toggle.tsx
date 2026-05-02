"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <Button size="sm" variant="outline" onClick={() => setTheme(dark ? "light" : "dark")}>
      {dark ? "Light" : "Dark"}
    </Button>
  );
}
