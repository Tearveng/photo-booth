import Welcome from "@/components/Welcome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome",
  keywords: [
    "Photo booth",
    "Photo booth online",
    "Photo booth capture",
    "capture online",
    "online photo booth",
  ],
};

export default function Page() {
  return <Welcome />;
}
