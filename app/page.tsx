'use client'

import { useState } from 'react'

// 旅行数据
const travelData = {
  title: '漫步古都·寻味东瀛',
  subtitle: '7天6夜 · 大阪 · 京都 · 奈良 · 神户',
  badge: '🇯🇵 日本关西深度游',
  stats: [
    { value: '7', label: '天行程' },
    { value: '4', label: '座城市' },
    { value: '15+', label: '个景点' },
  ],
  days: [
    {
      day: 'DAY 1',
      title: '抵达大阪',
      weather: '☀️ 22°C',
      activities: [
        { time: '14:00', title: '✈️ 抵达关西国际机场', desc: '乘坐南海电铁前往难波站，车程约45分钟' },
        { time: '16:00', title: '🏨 入住酒店', desc: '难波站附近酒店，办理入住并稍作休息' },
        { time: '18:30', title: '🍜 道顿堀夜游', desc: '漫步美食街，品尝章鱼烧大阪烧', images: ['https://images.unsplash.com/photo-1576489922094-2cfe89fb173c?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400&h=300&fit=crop'] },
      ]
    },
    {
      day: 'DAY 2',
      title: '大阪城探索',
      weather: '🌤️ 24°C',
      activities: [
        { time: '09:00', title: '🏯 大阪城公园', desc: '参观丰臣秀吉建造的天守阁', images: ['https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop'] },
        { time: '12:00', title: '🍛 午餐：炸串串', desc: '尝遍各种油炸美食' },
        { time: '14:30', title: '🗼 通天阁', desc: '登上展望台俯瞰大阪市区' },
      ]
    },
    {
      day: 'DAY 3',
      title: '京都初见',
      weather: '🌸 21°C',
      activities: [
        { time: '08:00', title: '🚃 前往京都', desc: '乘坐JR新快速前往京都，约15分钟' },
        { time: '10:00', title: '⛩️ 清水寺', desc: '世界文化遗产，漫步音羽瀑布', images: ['https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop'] },
        { time: '15:00', title: '⛩️ 伏见稻荷大社', desc: '千本鸟居的隧道' },
      ]
    },
    {
      day: 'DAY 4',
      title: '岚山竹林',
      weather: '☁️ 20°C',
      activities: [
        { time: '09:00', title: '🎋 岚山竹林', desc: '漫步竹林小径', images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop'] },
        { time: '13:00', title: '🚲 岚山骑行', desc: '租借自行车环游岚山地区' },
      ]
    },
    {
      day: 'DAY 5',
      title: '奈良小鹿',
      weather: '🌤️ 23°C',
      activities: [
        { time: '10:00', title: '🦌 奈良公园', desc: '与上千只小鹿亲密接触', images: ['https://images.unsplash.com/photo-1583553752222-8d496a2a2d08?w=400&h=300&fit=crop'] },
        { time: '13:00', title: '⛩️ 东大寺', desc: '参观世界最大木质建筑' },
      ]
    },
    {
      day: 'DAY 6',
      title: '神户漫游',
      weather: '🌊 22°C',
      activities: [
        { time: '10:30', title: '🗿 北野异人馆', desc: '漫步欧式建筑街区', images: ['https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop'] },
        { time: '13:00', title: '🥩 神户牛午餐', desc: '品尝世界闻名的神户和牛' },
      ]
    },
    {
      day: 'DAY 7',
      title: '返程日',
      weather: '☀️ 21°C',
      activities: [
        { time: '10:00', title: '🛍️ 最后购物', desc: '在难波商圈购买伴手礼' },
        { time: '14:00', title: '✈️ 返程', desc: '前往关西国际机场，结束美好旅程' },
      ]
    },
  ],
  packing: [
    { category: '👕 衣物', items: ['换洗衣物', '舒适运动鞋', '外套/轻薄羽绒服', '睡衣'] },
    { category: '📱 电子设备', items: ['手机 + 充电器', '充电宝', '相机', '日本上网卡/流量包'] },
    { category: '📄 证件', items: ['护照', '签证', '身份证', '机票行程单'] },
    { category: '💊 其他', items: ['常用药品', '雨伞', '背包', '少量现金/信用卡'] },
  ],
  route: [
    { icon: '🛫', name: '大阪', days: 'Day 1-2' },
    { icon: '🏯', name: '京都', days: 'Day 3-4' },
    { icon: '🦌', name: '奈良', days: 'Day 5' },
    { icon: '🥩', name: '神户', days: 'Day 6' },
    { icon: '🛬', name: '返程', days: 'Day 7' },
  ],
}

// Header 组件
function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <a href="#" style={styles.logo}>
          <span style={styles.logoIcon}>✈️</span>
          <span>旅行时光机</span>
        </a>
        <nav style={styles.nav}>
          <a href="#timeline">行程</a>
          <a href="#packing">物品清单</a>
          <a href="#route">路线</a>
        </nav>
      </div>
    </header>
  )
}

// Hero 组件
function Hero() {
  return (
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <div style={styles.heroBadge}>{travelData.badge}</div>
        <h1 style={styles.heroTitle}>漫步古都<br />寻味东瀛</h1>
        <p style={styles.heroSubtitle}>{travelData.subtitle}</p>
        <div style={styles.heroStats}>
          {travelData.stats.map((stat, i) => (
            <div key={i} style={styles.stat}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// DayCard 组件
function DayCard({ day, index }: { day: typeof travelData.days[0], index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ ...styles.timelineItem, animationDelay: `${(index + 1) * 0.1}s` } as React.CSSProperties}>
      <div style={styles.timelineDot}></div>
      <div 
        style={styles.dayCard} 
        onClick={() => setExpanded(!expanded)}
      >
        <div style={styles.dayHeader}>
          <div>
            <div style={styles.dayNumber}>{day.day}</div>
            <h3 style={styles.dayTitle}>{day.title}</h3>
          </div>
          <div style={styles.dayMeta}>
            <span>{day.weather}</span>
            <span style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>▼</span>
          </div>
        </div>
        <div style={{ 
          ...styles.dayContent, 
          maxHeight: expanded ? '2000px' : '0',
          padding: expanded ? '24px' : '0'
        }}>
          <div style={styles.activities}>
            {day.activities.map((activity, i) => (
              <div key={i} style={styles.activity}>
                <div style={styles.activityTime}>{activity.time}</div>
                <div style={styles.activityInfo}>
                  <h4>{activity.title}</h4>
                  <p>{activity.desc}</p>
                  {activity.images && (
                    <div style={styles.activityImages}>
                      {activity.images.map((img, j) => (
                        <img key={j} src={img} alt="" style={styles.activityImg} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Timeline 组件
function Timeline() {
  return (
    <section id="timeline" style={styles.section}>
      <h2 style={styles.sectionTitle}>每日行程</h2>
      <div style={styles.timeline}>
        {travelData.days.map((day, i) => (
          <DayCard key={i} day={day} index={i} />
        ))}
      </div>
    </section>
  )
}

// PackingCategory 组件
function PackingCategory({ category: cat, index }: { category: { category: string; items: string[] }, index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [checked, setChecked] = useState<boolean[]>(new Array(cat.items.length).fill(false))

  const toggleCheck = (i: number) => {
    const newChecked = [...checked]
    newChecked[i] = !newChecked[i]
    setChecked(newChecked)
  }

  return (
    <div style={styles.packingCategory}>
      <div 
        style={styles.packingCategoryHeader} 
        onClick={() => setExpanded(!expanded)}
      >
        <span>{cat.category}</span>
        <span style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>▼</span>
      </div>
      <div style={{ 
        ...styles.packingItems, 
        maxHeight: expanded ? '500px' : '0',
        padding: expanded ? '16px 20px' : '0'
      }}>
        {cat.items.map((item, i) => (
          <div key={i} style={styles.packingItem}>
            <input 
              type="checkbox" 
              checked={checked[i]} 
              onChange={() => toggleCheck(i)}
              style={styles.checkbox}
            />
            <label style={{ 
              ...styles.packingLabel,
              textDecoration: checked[i] ? 'line-through' : 'none',
              color: checked[i] ? '#666' : '#333'
            }}>
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

// Packing 组件
function Packing() {
  return (
    <section id="packing" style={styles.section}>
      <h2 style={styles.sectionTitle}>物品清单</h2>
      <div style={styles.packingSection}>
        <div style={styles.packingGrid}>
          {travelData.packing.map((cat, i) => (
            <PackingCategory key={i} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Route 组件
function Route() {
  return (
    <section id="route" style={styles.section}>
      <h2 style={styles.sectionTitle}>路线规划</h2>
      <div style={styles.routeSection}>
        <div style={styles.routeMap}>
          <div style={{ textAlign: 'center', color: 'var(--primary)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🗾</div>
            <div style={{ fontWeight: 600 }}>关西地区路线图</div>
          </div>
        </div>
        <div style={styles.routeNodes}>
          {travelData.route.map((node, i) => (
            <div key={i} style={styles.routeNode}>
              <div style={styles.routeNodeIcon}>{node.icon}</div>
              <div style={styles.routeNodeName}>{node.name}</div>
              <div style={styles.routeNodeDays}>{node.days}</div>
            </div>
          ))}
        </div>
        <div style={styles.routeStats}>
          <div style={styles.routeStat}>
            <div style={styles.routeStatValue}>~350km</div>
            <div style={styles.routeStatLabel}>总行程</div>
          </div>
          <div style={styles.routeStat}>
            <div style={styles.routeStatValue}>7天</div>
            <div style={styles.routeStatLabel}>旅行时间</div>
          </div>
          <div style={styles.routeStat}>
            <div style={styles.routeStatValue}>4城</div>
            <div style={styles.routeStatLabel}>目的地</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer 组件
function Footer() {
  const [showTop, setShowTop] = useState(false)

  if (typeof window !== 'undefined') {
    window.onscroll = () => setShowTop(window.scrollY > 300)
  }

  return (
    <>
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>✈️ 旅行时光机</div>
          <p style={styles.footerText}>记录每一段精彩旅程</p>
        </div>
      </footer>
      <button 
        style={{ 
          ...styles.backToTop,
          opacity: showTop ? 1 : 0,
          visibility: showTop ? 'visible' : 'hidden'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </>
  )
}

// 主页面组件
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Timeline />
        <Packing />
        <Route />
      </div>
      <Footer />
    </main>
  )
}

// 样式对象
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    padding: '16px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  headerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--primary)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    fontSize: '1.8rem',
  },
  nav: {
    display: 'flex',
    gap: '32px',
  },
  hero: {
    height: '70vh',
    minHeight: '500px',
    background: 'linear-gradient(135deg, var(--primary) 0%, #1a3d30 100%)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: '60px',
  },
  heroContent: {
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
    padding: '0 24px',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.15)',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '0.875rem',
    marginBottom: '24px',
    backdropFilter: 'blur(5px)',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 700,
    marginBottom: '16px',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    marginBottom: '32px',
  },
  heroStats: {
    display: 'flex',
    gap: '48px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  stat: {
    textAlign: 'center' as const,
  },
  statValue: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '2.5rem',
    fontWeight: 700,
    color: 'var(--accent)',
  },
  statLabel: {
    fontSize: '0.875rem',
    opacity: 0.8,
  },
  section: {
    marginBottom: '80px',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    color: 'var(--primary)',
    marginBottom: '48px',
    textAlign: 'center' as const,
    position: 'relative' as const,
  },
  timeline: {
    position: 'relative' as const,
    padding: '20px 0',
  },
  timelineItem: {
    position: 'relative' as const,
    width: '50%',
    padding: '0 40px 60px',
    opacity: 0,
    animation: 'fadeInUp 0.6s forwards',
  },
  timelineDot: {
    position: 'absolute' as const,
    width: '20px',
    height: '20px',
    background: 'var(--accent)',
    border: '4px solid var(--bg)',
    borderRadius: '50%',
    top: 0,
    boxShadow: '0 0 0 4px rgba(232, 115, 74, 0.3)',
  },
  dayCard: {
    background: 'var(--card-bg)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  dayHeader: {
    background: 'linear-gradient(135deg, var(--primary), #3d7a64)',
    color: 'white',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayNumber: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.875rem',
    opacity: 0.9,
  },
  dayTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  dayMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '0.875rem',
  },
  dayContent: {
    overflow: 'hidden',
    transition: 'all 0.4s ease',
  },
  activities: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  activity: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '16px',
    alignItems: 'start',
    padding: '16px',
    background: 'var(--secondary)',
    borderRadius: '12px',
  },
  activityTime: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    color: 'var(--accent)',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap' as const,
  },
  activityInfo: {
    flex: 1,
  },
  activityImages: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    marginTop: '12px',
  },
  activityImg: {
    width: '100%',
    height: '120px',
    objectFit: 'cover' as const,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
  packingSection: {
    background: 'var(--card-bg)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: 'var(--shadow)',
  },
  packingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  packingCategory: {
    border: '2px solid var(--secondary)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  packingCategoryHeader: {
    background: 'var(--secondary)',
    padding: '16px 20px',
    fontWeight: 600,
    color: 'var(--primary)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packingItems: {
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  packingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    accentColor: 'var(--primary)',
    cursor: 'pointer',
  },
  packingLabel: {
    cursor: 'pointer',
    flex: 1,
  },
  routeSection: {
    background: 'var(--card-bg)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: 'var(--shadow)',
  },
  routeMap: {
    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
    borderRadius: '16px',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  routeNodes: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },
  routeNode: {
    flex: 1,
    minWidth: '120px',
    textAlign: 'center' as const,
    padding: '20px',
    background: 'var(--secondary)',
    borderRadius: '12px',
    position: 'relative' as const,
  },
  routeNodeIcon: {
    fontSize: '2rem',
    marginBottom: '8px',
  },
  routeNodeName: {
    fontWeight: 600,
    color: 'var(--primary)',
    marginBottom: '4px',
  },
  routeNodeDays: {
    fontSize: '0.875rem',
    color: 'var(--text-light)',
  },
  routeStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '48px',
    marginTop: '32px',
    paddingTop: '32px',
    borderTop: '2px solid var(--secondary)',
  },
  routeStat: {
    textAlign: 'center' as const,
  },
  routeStatValue: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--primary)',
  },
  routeStatLabel: {
    fontSize: '0.875rem',
    color: 'var(--text-light)',
  },
  footer: {
    background: 'var(--primary)',
    color: 'white',
    padding: '48px 24px',
    textAlign: 'center' as const,
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerLogo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    marginBottom: '16px',
  },
  footerText: {
    opacity: 0.8,
    fontSize: '0.875rem',
  },
  backToTop: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    width: '48px',
    height: '48px',
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.25rem',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.3s',
  },
}
