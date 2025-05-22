import BoothLayout from "@/components/BoothLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose your layout",
  keywords: [
    "Photo booth",
    "Photo booth layout",
    "Choosing layout capture",
    "Layout",
    "Capture photo booth",
  ],
};

export default function Layout() {
  return <BoothLayout />;
}
