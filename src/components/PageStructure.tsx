import React, { ReactElement } from "react";

const PageStructure = ({
  children,
  title,
  description,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-[calc(100vw-280px)] h-[calc(100vh-90px)]">
      <div className="pb-5">
        <h1 className="text-2xl font-medium text-muted-foreground">{title}</h1>
        <h2 className="text-xl font-light text-muted-foreground/90">
          {description}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
};

export default PageStructure;
