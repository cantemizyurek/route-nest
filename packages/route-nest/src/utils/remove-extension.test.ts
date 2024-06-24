import { describe, it } from 'vitest'
import { removeExtension } from './remove-extension.js'

describe('removeExtension', () => {
  it('should remove the extension from a string', ({ expect }) => {
    const result = removeExtension('test.ts')
    expect(result).toBe('test')
  })
})
