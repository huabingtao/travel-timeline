import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '时光机 - 旅游攻略',
  description: '记录旅行路线和攻略的时间轴网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
