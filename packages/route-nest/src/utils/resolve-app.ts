import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const appDir = pathToFileURL(join(process.cwd(), 'app/'))

export function resolveApp(path: string): string {
	return fileURLToPath(new URL(path, appDir))
}
