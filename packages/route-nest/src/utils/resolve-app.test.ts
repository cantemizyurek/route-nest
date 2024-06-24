import { describe, it } from 'vitest'
import { resolveApp } from './resolve-app.js'
import { join } from 'node:path'

describe('resolveApp', () => {
  it('should return a valid URL when given a relative path', ({ expect }) => {
    const result = resolveApp('test.ts')
    expect(result).toBe(join(process.cwd(), 'app', 'test.ts'))
  })

  it('should return a valid URL when given an absolute path', ({ expect }) => {
    const result = resolveApp('/test.ts')
    expect(result).toBe('/test.ts')
  })
})
