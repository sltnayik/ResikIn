import Image from "next/image";

export default function AppLogo() {
  return (
    <div className="h-25 w-25 overflow-hidden">
      <Image
        src="/logo-no-bg.png"
        alt="ResikIn logo"
        width={100}
        height={100}
        className="h-full w-full object-contain"
        priority
      />
    </div>
  );
}
