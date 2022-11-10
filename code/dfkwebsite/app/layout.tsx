// These styles apply to every route in the application
import './globals.css';
import Navbar from './Navbar';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="container mx-auto">
        <Navbar />
        {children}
      </body>
    </html>
  );
}