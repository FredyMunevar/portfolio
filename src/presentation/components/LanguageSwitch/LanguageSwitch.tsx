"use client";
import { usePathname, useRouter, locales } from "@/i18n/routing";
import Button from "../Button/Button";
import { sendGAEvent } from "@next/third-parties/google";

const LanguageSwitch = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return locales.map(
    (loc) =>
      loc !== locale && (
        <Button
          key={loc}
          onClick={() => {
            changeLocale(loc);
            sendGAEvent("event", "languageClicked", { value: `language switched to ${loc}` });
          }}
        >
          <span className="font-normal lg:hidden">{loc}</span>
          <span className="font-normal hidden lg:block">{loc === "en" ? "English" : "Español"}</span>
        </Button>
      )
  );
};

export default LanguageSwitch;
