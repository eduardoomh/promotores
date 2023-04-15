import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { useEffect, useState } from 'react'

/**
 * Hook which helps you to know if the device is in mobile or desktop state
 * @returns If the device is in mobile state and the window width
 */
const useDevice = () => {
  const { sm, lg } = useBreakpoint()
  const [windowWidth, setWindowWidth] = useState<number>()

  useEffect(() => {
    if (!Boolean(window)) return

    setWindowWidth(window.innerWidth)
  }, [])

  return {
    isMobile: !sm,
    isTablet: !lg,
    windowWidth,
  }
}

export default useDevice