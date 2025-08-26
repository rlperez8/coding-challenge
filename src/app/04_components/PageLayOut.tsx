// components/PageLayout.tsx
import NavBar from "./NavBar";
import Header from "./Header";


interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="pagelayout_outer">
      <div className="pagelayout_inner">
        <NavBar />
        <div className="displayed_page">
          <Header />
          {children} 
        </div>
      </div>
    </div>
  );
}