import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({ subsets: ["latin"] });

interface InfoSectionHeaderProps {
  children: React.ReactNode;
}

export const InfoSectionHeader = ({ children }: InfoSectionHeaderProps) => {
  return (
    <div className={geistMono.className} style={headerStyles}>
      {children?.toString().toUpperCase()}
    </div>
  );
};

const headerStyles = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#C7C7C7",
};
