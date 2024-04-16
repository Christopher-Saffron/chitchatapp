import React from "react";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

function DesktopItem({
  label,
  href,
  onClick,
  active,
}: DesktopItemProps): React.ReactNode {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li
      onClick={handleClick}
      className=" text-green-300 border border-green-300 px-5 py-3"
    >
      <Link href={href}>
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default DesktopItem;
