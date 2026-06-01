import Navbar from './Navbar';
import Footer from './Footer';

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
  darkHero?: boolean;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
