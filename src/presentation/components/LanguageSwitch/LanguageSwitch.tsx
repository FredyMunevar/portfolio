"use client";
import { usePathname, useRouter, locales } from "@/i18n/routing";
import Button from "../Button/Button";

export default function LanguageSwitch({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      {locales.map(
        (loc) =>
          loc !== locale && (
            <Button key={loc} onClick={() => changeLocale(loc)}>
              <span className="font-extralight lg:hidden">{loc}</span>
              <span className="font-extralight hidden lg:block">{loc === "en" ? "English" : "Español"}</span>
            </Button>
          )
      )}
    </>
  );
}
