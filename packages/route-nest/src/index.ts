import * as fs from 'fs/promises'
import { RouteHandler, RouteTypes, TreeNode } from './types'
import { removeExtension } from './utils/remove-extension'
import { resolveApp } from './utils/resolve-app'

export async function initRouteNestTree(
  folderPath: string,
  options?: {
    dynamic?: boolean
  }
): Promise<TreeNode> {
  const tree: TreeNode = {
    handlers: initializeEmptyHandlers(),
    children: {},
    middlewares: await getMiddlewares(),
    dynamic: options?.dynamic ?? false,
  }

  for (const child of await getFolderChildrenNames()) {
    if (await isFile(child)) {
      // @ts-ignore
      if (RouteTypes[removeExtension(child).toUpperCase()] === undefined)
        continue
      tree.handlers[removeExtension(child) as RouteTypes] =
        (await getHandler(child)) || null
    } else {
      tree.children[isDynamicRoute(child) ? child.slice(1, -1) : child] =
        await getRoute(child)
    }
  }

  return tree

  async function getMiddlewares() {
    try {
      const middlewares = await import(resolveApp(`${folderPath}/middleware`))
      return Object.entries(middlewares).map(
        ([_, value]) => value
      ) as RouteHandler[]
    } catch (e) {
      return [] as RouteHandler[]
    }
  }

  async function getHandler(name: string) {
    return (await import(resolveApp(`${folderPath}/${name}`)))
      .default as RouteHandler
  }

  function getRoute(name: string) {
    return initRouteNestTree(`${folderPath}/${name}`, {
      dynamic: isDynamicRoute(name),
    })
  }

  function isDynamicRoute(name: string) {
    return name.startsWith('[') && name.endsWith(']')
  }

  function getFolderChildrenNames() {
    return fs.readdir(resolveApp(folderPath))
  }

  async function isFile(name: string) {
    return (await fs.stat(resolveApp(`${folderPath}/${name}`))).isFile()
  }

  function initializeEmptyHandlers() {
    return Object.fromEntries(
      Object.entries(RouteTypes).map(([key, value]) => [value, null])
    ) as Record<RouteTypes, RouteHandler | null>
  }
}
