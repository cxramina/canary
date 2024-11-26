import { useThemeStore } from './use-theme-store'

export const useTheme = () => {
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)

  return { theme, setTheme }
}
