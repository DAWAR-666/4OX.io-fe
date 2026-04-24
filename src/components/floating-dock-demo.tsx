
import { FloatingDock } from "@/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin />
      ),
      href: "https://www.linkedin.com/in/prathamdawar666/",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub />
      ),
      href: "https://github.com/DAWAR-666",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        items={links}
      />
    </div>
  );
}
