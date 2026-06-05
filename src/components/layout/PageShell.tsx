import Navbar from './Navbar';
import Footer from './Footer';

export default function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  darkHero?: boolean;
  className?: string;
}) {
  return (
    <>
      <Navbar />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}
