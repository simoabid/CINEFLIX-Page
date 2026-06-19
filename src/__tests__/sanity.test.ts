import { describe, it, expect } from 'vitest'

describe('Sanity test for global mocks', (): void => {
  it('should have matchMedia mocked', (): void => {
    const mediaQueryList: MediaQueryList = window.matchMedia('(max-width: 600px)')
    expect(mediaQueryList.matches).toBe(false)
    expect(mediaQueryList.media).toBe('(max-width: 600px)')
  })

  it('should have IntersectionObserver mocked', (): void => {
    const observer: IntersectionObserver = new window.IntersectionObserver((): void => {})
    expect(observer).toBeDefined()
    expect(observer.observe).toBeDefined()
  })

  it('should have scrollTo mocked', (): void => {
    expect(window.scrollTo).toBeDefined()
    window.scrollTo(0, 0)
    expect(window.scrollTo).toHaveBeenCalled()
  })
})
