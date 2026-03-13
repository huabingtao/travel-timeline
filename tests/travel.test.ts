import { describe, it, expect } from 'vitest'
import { allTrips } from '../app/page'

describe('Travel Timeline App', () => {
  describe('Travel Data', () => {
    it('should have at least one trip', () => {
      expect(allTrips.length).toBeGreaterThan(0)
    })

    it('should have valid trip data structure', () => {
      const trip = allTrips[0]
      expect(trip.id).toBeDefined()
      expect(trip.title).toBeDefined()
      expect(trip.badge).toBeDefined()
      expect(trip.days).toBeDefined()
      expect(Array.isArray(trip.days)).toBe(true)
    })

    it('should have correct trip id for Ningbo trip', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      expect(trip).toBeDefined()
      expect(trip?.title).toContain('宁波')
    })
  })

  describe('Trip Days', () => {
    it('should have 2 days for Ningbo trip', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      expect(trip?.days.length).toBe(2)
    })

    it('should have correct day titles', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      expect(trip?.days[0].day).toBe('DAY 1')
      expect(trip?.days[1].day).toBe('DAY 2')
    })
  })

  describe('Trip Activities', () => {
    it('should have activities for each day', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      expect(trip?.days[0].activities.length).toBeGreaterThan(0)
      expect(trip?.days[1].activities.length).toBeGreaterThan(0)
    })

    it('should have valid activity structure', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      const activity = trip?.days[0].activities[0]
      expect(activity?.time).toBeDefined()
      expect(activity?.title).toBeDefined()
      expect(activity?.desc).toBeDefined()
    })
  })

  describe('Trip Stats', () => {
    it('should have stats for the trip', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      expect(trip?.stats.length).toBeGreaterThan(0)
    })

    it('should have 4 people', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      const peopleStat = trip?.stats.find(s => s.label === '人同行')
      expect(peopleStat?.value).toBe('4')
    })
  })

  describe('Charging Stations', () => {
    it('should have charging activities', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      const hasCharging = trip?.days.some(day => 
        day.activities.some(activity => activity.title.includes('充电'))
      )
      expect(hasCharging).toBe(true)
    })

    it('should have reduced charging stops (one per day)', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      const day1Charging = trip?.days[0].activities.filter(a => a.title.includes('充电')).length
      const day2Charging = trip?.days[1].activities.filter(a => a.title.includes('充电')).length
      expect(day1Charging).toBeLessThanOrEqual(1)
      expect(day2Charging).toBeLessThanOrEqual(1)
    })
  })

  describe('Hotel Info', () => {
    it('should have hotel with 寒松路地铁站', () => {
      const trip = allTrips.find(t => t.id === 'ningbo')
      const hasCorrectHotel = trip?.days.some(day =>
        day.activities.some(activity => activity.desc.includes('寒松路地铁站酒店'))
      )
      expect(hasCorrectHotel).toBe(true)
    })
  })
})
