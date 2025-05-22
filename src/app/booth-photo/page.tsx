import BoothCapture from "@/components/BoothCapture";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camera",
  keywords: [
    "Photo booth",
    "Photo booth camera",
    "Camera capture",
    "Capture online",
    "Capture photo booth",
  ],
};

export default function PhotoBooth() {
  return <BoothCapture />;
}
