import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '旅行时光机 - 日本关西7日游',
  description: '记录旅游路线和攻略的时间轴网站',
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
