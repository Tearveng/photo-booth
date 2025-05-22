import BoothEdit from "@/components/BoothEdit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booth Edit",
  keywords: [
    "Photo booth",
    "Photo booth edit",
    "Capture and edit",
    "Edit photo booth",
    "Booth edit",
  ],
};

export default function Edit() {
  return <BoothEdit />;
}
