export interface SystemInfo {
  batteryLevel: number
  isCharging: boolean
  wifiStrength: number
  wifiConnected: boolean
}

class SystemService {
  private batteryLevel = 100
  private isCharging = false
  private wifiStrength = 100
  private wifiConnected = true
  private listeners: Map<string, Set<Function>> = new Map()

  constructor() {
    // Simulate battery drain
    setInterval(() => {
      if (!this.isCharging && this.batteryLevel > 0) {
        this.batteryLevel -= 1
        this.emit('batteryChange', { level: this.batteryLevel, charging: this.isCharging })
      }
    }, 60000)

    // Simulate random wifi changes
    setInterval(() => {
      this.wifiStrength = Math.max(0, Math.min(100, this.wifiStrength + (Math.random() * 20 - 10)))
      this.emit('wifiChange', { strength: this.wifiStrength, connected: this.wifiConnected })
    }, 30000)
  }

  public getBatteryInfo() {
    return {
      level: this.batteryLevel,
      charging: this.isCharging
    }
  }

  public getWifiInfo() {
    return {
      strength: this.wifiStrength,
      connected: this.wifiConnected
    }
  }

  public toggleCharging() {
    this.isCharging = !this.isCharging
    this.emit('batteryChange', { level: this.batteryLevel, charging: this.isCharging })
  }

  public toggleWifi() {
    this.wifiConnected = !this.wifiConnected
    this.emit('wifiChange', { strength: this.wifiStrength, connected: this.wifiConnected })
  }

  public on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)?.add(callback)
  }

  public off(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback)
  }

  private emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data))
  }
}

export const systemService = new SystemService() 