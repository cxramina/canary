export function encode(arg: unknown): string | undefined {
  if (typeof arg !== 'undefined') return btoa(encodeURIComponent(JSON.stringify(arg)))
}

export function decode<T = unknown>(arg: string): T {
  return JSON.parse(decodeURIComponent(atob(arg)))
}

export default class SecureStorage {
  public static exceptions: string[] = []
  public static sessionExceptions: string[] = []

  public static set(key: string, value: unknown): void {
    const str = encode(value)
    if (str) localStorage.setItem(key, str)
  }

  public static get<T = unknown>(key: string): T | undefined {
    const str = localStorage.getItem(key)
    if (str) return decode<T>(str)
  }

  public static registerCleanupException(key: string): void {
    SecureStorage.exceptions.push(key)
  }

  public static registerCleanupSessionException(key: string): void {
    SecureStorage.sessionExceptions.push(key)
  }

  public static clear(): void {
    // clear localStorage, except fields to persist across user-sessions:
    const storage: [string, string][] = SecureStorage.exceptions.map(key => [key, localStorage.getItem(key) || ''])
    const sessionKeys: [string, string][] = SecureStorage.sessionExceptions.map(key => [
      key,
      sessionStorage.getItem(key) || ''
    ])

    localStorage.clear()

    /* adding this to clear sessionStorage on logout - because at harness we want user session to end once the user is logged out,
       so we are clearing this from our end - because by default sessionStorage behavior doesn't care for login/logout events */
    sessionStorage.clear()

    storage.forEach(([key, val]) => {
      localStorage.setItem(key, val)
    })

    sessionKeys.forEach(([key, val]) => {
      sessionStorage.setItem(key, val)
    })
  }
}
