"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import confetti from "canvas-confetti";
import { House } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  const handleHomeClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] p-4 bg-black">
      <p className="text-xl mb-6 text-center">
        <strong>matsjfunke.com{pathname}</strong> could not be found.
      </p>
      <div className="mb-6">
        <Image
          src="/not-found/404-meme.jpg"
          alt="404 meme - I wasn't looking for page 404"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>
      <p className="text-sm italic mb-2 block">
        Don&apos;t worry, it happens to the best of us!
      </p>
      <Button
        variant="blackBorder"
        className="mt-2 rounded-lg"
        onClick={handleHomeClick}
      >
        <House /> home
      </Button>
    </div>
  );
}
