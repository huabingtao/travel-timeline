'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 旅行数据 - 支持多条攻略
type TripData = {
  id: string
  title: string
  subtitle: string
  badge: string
  stats: { value: string; label: string }[]
  heroCard: {
    title: string
    subtitle: string
    date: string
    route: string
    distance: string
    charging?: string
  }
  days: {
    day: string
    title: string
    weather: string
    activities: { time: string; title: string; desc: string; images?: string[] }[]
  }[]
  maps?: { 去的路线?: string; 服务区?: string }
  packing: { category: string; items: string[] }[]
  route: { icon: string; name: string; days: string }[]
}

export const allTrips: TripData[] = [
  {
    id: 'ningbo',
    title: '上海→宁波东西岙徒步',
    subtitle: '2天1夜 · 特斯拉Model Y 2022后轮驱动版 · 4人',
    badge: '🏔️ 宁波奉化溪口',
    stats: [
      { value: '2', label: '天行程' },
      { value: '10km', label: '徒步里程' },
      { value: '500m', label: '累计爬升' },
      { value: '4', label: '人同行' },
    ],
    heroCard: {
      title: '🚗 特斯拉Model Y 2022后轮驱动版 · 4人',
      subtitle: '2天1夜 · 4人 · 3月14日-15日',
      date: '2026年3月14日-15日',
      route: '罗阳三村 → 宁波 → 罗阳三村',
      distance: '约560km（往返）',
      charging: '服务区超充站',
    },
    days: [
      {
        day: 'DAY 1',
        title: '3月14日 周六：上海→宁波',
        weather: '🌤️ 18°C',
        activities: [
          { time: '08:00', title: '🚗 罗阳三村出发', desc: '自驾特斯拉Model Y 2022后轮驱动版，4人出发' },
          { time: '10:00', title: '🔋 充电休息', desc: '嘉兴服务区超充站充电+休息' },
          { time: '12:30', title: '🚗 前往徒步起点', desc: '自驾前往奉化溪口镇东岙村停车场' },
          { time: '13:00', title: '🥾 开始徒步', desc: '东西岙徒步路线：东岙村 → 三十六湾村 → 徐凫岩瀑布 → 西岙村（全程约10公里，4-5小时）' },
          { time: '17:30', title: '🏠 下山返回', desc: '徒步结束，自驾前往酒店' },
          { time: '18:00', title: '🛏️ 入住酒店', desc: '全季宁波诺丁汉大学寒松路地铁站酒店，办理入住' },
          { time: '19:30', title: '🍺 晚餐&休息', desc: '酒店附近晚餐，品尝宁波海鲜，4人好好休息' },
        ]
      },
      {
        day: 'DAY 2',
        title: '3月15日 周日：宁波→上海',
        weather: '☀️ 20°C',
        activities: [
          { time: '08:00', title: '🌅 起床早餐', desc: '酒店享用早餐' },
          { time: '09:00', title: '🛍️ 自由活动', desc: '可逛天一广场、老外滩，购买宁波特产' },
          { time: '11:30', title: '🍜 午餐', desc: '品尝宁波汤圆、缸鸭狗等特色美食' },
          { time: '12:30', title: '🚗 退房返程', desc: '自驾返回上海' },
          { time: '15:00', title: '🔋 充电休息', desc: '嘉兴服务区超充' },
          { time: '16:30', title: '🏠 抵达罗阳三村', desc: '结束愉快周末，4人平安回家' },
        ]
      },
    ],
    maps: {
      去的路线: 'https://uri.amap.com/marker?markers=121.369,31.106;121.550,29.883&callnative=1',
      服务区: 'https://www.amap.com/search?query=高速服务区充电站&city=330000',
    },
    packing: [
      { category: '👕 衣物', items: ['舒适运动鞋', '登山鞋（防滑）', '速干衣', '外套/冲锋衣', '换洗衣物'] },
      { category: '🎒 徒步装备', items: ['登山杖（保护膝盖）', '双肩包', '帽子/防晒', '墨镜', '充电宝'] },
      { category: '📄 证件', items: ['身份证×4', '手机×4', '酒店订单', '驾照'] },
      { category: '🚗 车用装备', items: ['充电器', '手机支架×2', '行车记录仪', '车内零食'] },
      { category: '💊 其他', items: ['防晒霜', '少量现金', '零食/能量棒', '垃圾袋（环保）', '纸巾/湿巾'] },
    ],
    route: [
      { icon: '🚗', name: '罗阳三村', days: 'Day 1 早' },
      { icon: '🔋', name: '嘉兴服务区', days: 'Day 1 上午' },
      { icon: '🏨', name: '全季酒店', days: 'Day 1 中午' },
      { icon: '⛰️', name: '东岙村', days: 'Day 1 下午' },
      { icon: '🏠', name: '酒店', days: 'Day 1 晚' },
      { icon: '🛍️', name: '天一广场', days: 'Day 2 上午' },
      { icon: '🔋', name: '服务区×2', days: 'Day 2 下午' },
      { icon: '🚗', name: '罗阳三村', days: 'Day 2 傍晚' },
    ],
  },
  // 可以继续添加更多攻略...
]

// 当前的旅行数据（根据选择的攻略）
const travelData = allTrips[0]

// Header 组件
function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <a href="#" style={styles.logo}>
          <span style={styles.logoIcon}>✈️</span>
          <span>时光机</span>
        </a>
        <nav style={styles.nav}>
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
        <h1 style={styles.heroTitle}>上海→宁波<br />东西岙徒步</h1>
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

// 首页卡片组件
function HeroCard({ trip }: { trip: TripData }) {
  return (
    <section style={styles.heroCardSection}>
      <div style={styles.heroCard}>
        <div style={styles.heroCardHeader}>
          <h2 style={styles.heroCardTitle}>{trip.heroCard.title}</h2>
          <span style={styles.heroCardDate}>{trip.heroCard.date}</span>
        </div>
        <div style={styles.heroCardContent}>
          <div style={styles.heroCardRow}>
            <span style={styles.heroCardLabel}>📍 路线</span>
            <span>{trip.heroCard.route}</span>
          </div>
          <div style={styles.heroCardRow}>
            <span style={styles.heroCardLabel}>📏 距离</span>
            <span>{trip.heroCard.distance}</span>
          </div>
          {trip.heroCard.charging && (
            <div style={styles.heroCardRow}>
              <span style={styles.heroCardLabel}>🔋 充电</span>
              <span>{trip.heroCard.charging}</span>
            </div>
          )}
          {trip.maps?.去的路线 && (
            <div style={styles.heroCardRow}>
              <span style={styles.heroCardLabel}>🗺️ 高德地图</span>
              <a 
                href={trip.maps.去的路线} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.heroCardLink}
              >
                查看路线 →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function DayCard({ day, index }: { day: typeof travelData.days[0], index: number }) {
  const [expanded, setExpanded] = useState(true)

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
function Timeline({ trip }: { trip: TripData }) {
  return (
    <div style={styles.timeline}>
      <div style={styles.timelineLine}></div>
      {trip.days.map((day, i) => (
        <DayCard key={i} day={day} index={i} />
      ))}
    </div>
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
function Packing({ trip }: { trip: TripData }) {
  return (
    <section id="packing" style={styles.section}>
      <h2 style={styles.sectionTitle}>物品清单</h2>
      <div style={styles.packingSection}>
        <div style={styles.packingGrid}>
          {trip.packing.map((cat, i) => (
            <PackingCategory key={i} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Route 组件
function Route({ trip }: { trip: TripData }) {
  return (
    <section id="route" style={styles.section}>
      <h2 style={styles.sectionTitle}>路线规划</h2>
      <div style={styles.routeSection}>
        <div style={styles.routeMap}>
          <div style={{ textAlign: 'center', color: 'var(--primary)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🗺️</div>
            <div style={{ fontWeight: 600 }}>{trip.title} 路线图</div>
          </div>
        </div>
        <div style={styles.routeNodes}>
          {trip.route.map((node, i) => (
            <div key={i} style={styles.routeNode}>
              <div style={styles.routeNodeIcon}>{node.icon}</div>
              <div style={styles.routeNodeName}>{node.name}</div>
              <div style={styles.routeNodeDays}>{node.days}</div>
            </div>
          ))}
        </div>
        <div style={styles.routeStats}>
          <div style={styles.routeStat}>
            <div style={styles.routeStatValue}>{trip.heroCard.distance}</div>
            <div style={styles.routeStatLabel}>总行程</div>
          </div>
          <div style={styles.routeStat}>
            <div style={styles.routeStatValue}>{trip.stats[0].value}</div>
            <div style={styles.routeStatLabel}>旅行天数</div>
          </div>
          <div style={styles.routeStat}>
            <div style={styles.routeStatValue}>{trip.route.length}</div>
            <div style={styles.routeStatLabel}>途经点</div>
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

// 加载组件

// 解析 URL 参数（静态版本）
function getTripIdFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('trip')
}

// 主页面组件
export default function Home() {
  const router = useRouter()
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)
  
  // 从 URL 初始化
  useEffect(() => {
    const tripId = getTripIdFromUrl()
    if (tripId) setSelectedTripId(tripId)
  }, [])
  
  const selectedTrip = allTrips.find(t => t.id === selectedTripId) || null

  const handleBack = () => {
    setSelectedTripId(null)
    router.push('/')
  }

  const handleCardClick = (id: string) => {
    setSelectedTripId(id)
    router.push(`/?trip=${id}`)
  }

  return (
    <main>
      <Header />
      {selectedTrip ? (
        // 详情页面
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 24px 40px' }}>
          <button 
            onClick={handleBack}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary)', 
              cursor: 'pointer',
              fontSize: '1rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← 返回列表
          </button>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '2rem', marginRight: '8px' }}>{selectedTrip.badge}</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 600 }}>
              {selectedTrip.title}
            </span>
          </div>
          <Timeline trip={selectedTrip} />
        </div>
      ) : (
        // 首页卡片列表
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 24px 40px' }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '2rem', 
            color: 'var(--primary)', 
            marginBottom: '32px',
            textAlign: 'center' 
          }}>
            我的旅行时光机
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {allTrips.map(trip => (
              <div 
                key={trip.id}
                onClick={() => handleCardClick(trip.id)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: 'var(--shadow)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>{trip.badge}</span>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', display: 'inline' }}>{trip.title}</h3>
                  </div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{trip.heroCard.date}</span>
                </div>
                <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>{trip.subtitle}</p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {trip.stats.map((stat, i) => (
                    <span key={i} style={{ 
                      background: 'var(--secondary)', 
                      padding: '4px 12px', 
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      color: 'var(--primary)'
                    }}>
                      {stat.value} {stat.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
  heroCardSection: {
    padding: '100px 24px 40px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
  },
  heroCard: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  heroCardHeader: {
    background: 'linear-gradient(135deg, var(--primary) 0%, #3d7a64 100%)',
    color: 'white',
    padding: '24px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '12px',
  },
  heroCardTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: 0,
  },
  heroCardDate: {
    opacity: 0.9,
    fontSize: '0.95rem',
  },
  heroCardContent: {
    padding: '24px 32px',
  },
  heroCardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
  },
  heroCardLabel: {
    fontWeight: 600,
    color: 'var(--primary)',
  },
  heroCardLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: 500,
  },
  tripSelector: {
    padding: '80px 24px 20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
  },
  tripSelectorInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tripSelectorBtn: {
    padding: '12px 24px',
    border: '2px solid var(--primary)',
    borderRadius: '30px',
    background: 'white',
    color: 'var(--primary)',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
  tripSelectorBtnActive: {
    background: 'var(--primary)',
    color: 'white',
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
    maxWidth: '800px',
    margin: '0 auto',
  },
  timelineItem: {
    position: 'relative' as const,
    width: '100%',
    padding: '0 0 40px 50px',
    opacity: 0,
    animation: 'fadeInUp 0.6s forwards',
  },
  timelineLine: {
    position: 'absolute' as const,
    left: '12px',
    top: '0',
    bottom: '0',
    width: '4px',
    background: 'linear-gradient(to bottom, var(--primary), var(--accent))',
    borderRadius: '2px',
    zIndex: 0,
  },
  timelineDot: {
    position: 'absolute' as const,
    left: '0',
    top: '20px',
    width: '24px',
    height: '24px',
    background: 'var(--accent)',
    border: '4px solid white',
    borderRadius: '50%',
    boxShadow: '0 0 0 4px rgba(232, 115, 74, 0.3)',
    zIndex: 1,
  },
  dayCard: {
    background: 'var(--card-bg)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    marginLeft: '20px',
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
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    padding: '20px',
    background: 'var(--secondary)',
    borderRadius: '12px',
    marginBottom: '12px',
  },
  activityTime: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    color: 'var(--accent)',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap' as const,
    minWidth: '70px',
    background: 'white',
    padding: '4px 8px',
    borderRadius: '6px',
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
