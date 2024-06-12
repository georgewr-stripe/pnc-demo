import localFont from "next/font/local";

export const lloydsFont = localFont({
  src: [
    {
      path: "../../public/fonts/lloyds_bank_jack-boldWEB.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/lloyds_bank_jack-lightWEB.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/lloyds_bank_jack-mediumWEB.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/lloyds_bank_jack-regularWEB.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lloyds",
});
