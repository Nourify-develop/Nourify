import { ReactNode, HTMLAttributes } from "react";
import { TypographyProps, ParagraphProps, SmallTextProps } from "@/types";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const headingStyles = {
  h1: "text-[2em] lg:text-[3em] font-normal leading-[3.5rem]",
  h2: "text-[1.5em] lg:text-[2em] font-normal leading-[3rem]",
  h3: "text-xl font-semibold leading-[2rem]",
  h4: "text-lg font-semibold leading-[1.5rem]",
};

const Typo = ({
  level,
  className,
  children,
  ...props
}: {
  level: keyof typeof headingStyles;
  children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>) => {
  const classes = `text-white-900 ${roboto.className} ${headingStyles[level]} ${className}`;
  return (
    <div className={classes} {...props}>
      <div className="sr-only">{children}</div>
      {children}
    </div>
  );
};

const h1 = ({ children, className, isGreen, ...props }: TypographyProps) => (
  <Typo
    level="h1"
    className={`${isGreen ? "text-[#013115]" : "text-black"} ${className}`}
    {...props}
  >
    {children}
  </Typo>
);

const h2 = ({ children, className, isGreen, ...props }: TypographyProps) => (
  <Typo
    level="h2"
    className={`${isGreen ? "text-[#013115]" : "text-black"} ${className}`}
    {...props}
  >
    {children}
  </Typo>
);

const h3 = ({ children, className, isGreen, ...props }: TypographyProps) => (
  <Typo
    level="h3"
    className={`${isGreen ? "text-[#013115]" : "text-black"} ${className}`}
    {...props}
  >
    {children}
  </Typo>
);

const h4 = ({ children, className, isGreen, ...props }: TypographyProps) => (
  <Typo
    level="h4"
    className={`${isGreen ? "text-[#013115]" : "text-black"} ${className}`}
    {...props}
  >
    {children}
  </Typo>
);

const p = ({ children, className, isGray, ...props }: ParagraphProps) => {
  return isGray ? (
    <>
      <p
        {...props}
        className={`text-base text-neutral-900 leading-normal ${roboto.className} ${className}`}
      >
        {children}
      </p>
      <p {...props} className="sr-only">
        {children}
      </p>
    </>
  ) : (
    <>
      <p
        {...props}
        className={`text-base text-gray-4 leading-normal ${roboto.className} ${className}`}
      >
        {children}
      </p>
      <p {...props} className="sr-only">
        {children}
      </p>
    </>
  );
};

const s = ({ children, isGray, className, ...props }: SmallTextProps) => {
  return isGray ? (
    <>
      <p
        {...props}
        className={`text-neutral-900 text-[0.75em] leading-normal ${roboto.className} ${className}`}
      >
        {children}
      </p>
      <p {...props} className="sr-only">
        {children}
      </p>
    </>
  ) : (
    <>
      <p
        {...props}
        className={`text-gray-4 text-[0.75em] leading-normal ${roboto.className} ${className}`}
      >
        {children}
      </p>
      <p {...props} className="sr-only">
        {children}
      </p>
    </>
  );
};

export default function Typography() {
  return <p></p>;
}

Typography.h1 = h1;
Typography.h2 = h2;
Typography.h3 = h3;
Typography.h4 = h4;
Typography.p = p;
Typography.s = s;
