import { PropsWithChildren } from "react";

export default function Heading({ children }: PropsWithChildren) {
  return (
    <div role="heading">
      {children}
    </div>
  );
}
