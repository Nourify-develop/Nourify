import Image from "next/image";
import Cart from "../Cart";

type UserSectionProps = {
  loginButtonRef: React.RefObject<HTMLDivElement>;
  handleLinkClick: () => void;
};

export const UserSection = ({ loginButtonRef, handleLinkClick }: UserSectionProps) => (
  <>
    <div className="hidden md:flex items-center gap-5 bg-gray-200 px-1 sm:ml-3 lg:ml-[1rem] py-1 rounded-full">
      <Cart />
      <div
        ref={loginButtonRef}
        className="bg-green rounded-full w-10 h-10 flex justify-center items-center cursor-pointer"
      >
        <Image
          src="/icons/user-circle.svg"
          alt="user circle"
          width={25}
          height={25}
        />
      </div>
    </div>
    <div className="flex items-center gap-3 relative z-20">
      <div className="block md:hidden">
        <Cart handleClick={handleLinkClick} />
      </div>
    </div>
  </>
);
