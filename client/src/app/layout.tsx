
import './globals.css'
import Layout from '@/components/Layout'
export const metadata = {
  title: 'ERP Dashboard',
  description: 'Modular ERP interface',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
