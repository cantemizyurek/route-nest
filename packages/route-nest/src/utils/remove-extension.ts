export function removeExtension(string: string) {
	return string.split('.').slice(0, -1).join('.')
}
