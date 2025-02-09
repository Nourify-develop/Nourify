import Image from "next/image";

type HamburgerButtonProps = {
  showMobileMenu: boolean;
  toggleMobileMenu: () => void;
  hamburgerRef: React.RefObject<HTMLButtonElement>;
};

export const HamburgerButton = ({ showMobileMenu, toggleMobileMenu, hamburgerRef }: HamburgerButtonProps) => (
  <div className="w-10 h-10 md:hidden cursor-pointer bg-gray-1 border border-gray-light-2 relative z-[1001] rounded-full flex justify-center items-center">
    <button
      onClick={toggleMobileMenu}
      ref={hamburgerRef}
      className="hamburger cursor-pointer focus:outline-none flex flex-col gap-1 justify-center items-center"
    >
      <Image
        src={showMobileMenu ? "/icons/cancel-01.svg" : "/icons/menu-04.svg"}
        alt="Menu btn"
        width={25}
        height={25}
      />
    </button>
  </div>
);