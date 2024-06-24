import { RouteTypes, TreeNode } from 'route-nest/src/types'
import express from 'express'
import { join } from 'node:path'

function prioritizeRoute(route: TreeNode) {
  if (route.dynamic) return 1
  return 0
}

export function initExpress(
  tree: TreeNode,
  app: express.Application = express()
) {
  addRoute(tree)
  return app

  function addRoute(node: TreeNode, path: string = '/', route = app) {
    for (const middleware of node.middlewares) {
      route.use(path, middleware as any)
    }

    for (const method in node.handlers) {
      if (node.handlers[method as RouteTypes] === null) continue
      if (method === 'get') {
        route.get(path, node.handlers[method] as any)
      } else if (method === 'post') {
        route.post(path, node.handlers[method] as any)
      } else if (method === 'put') {
        route.put(path, node.handlers[method] as any)
      } else if (method === 'delete') {
        route.delete(path, node.handlers[method] as any)
      } else if (method === 'patch') {
        route.patch(path, node.handlers[method] as any)
      }
    }

    // We need to sort soo the static routes don't get overwritten by dynamic routes
    const prioritizedRoutes = Object.entries(node.children)
      .sort((a, b) => prioritizeRoute(a[1]) - prioritizeRoute(b[1]))
      .map(([child]) => child)

    for (const child of prioritizedRoutes) {
      addRoute(
        node.children[child] as TreeNode,
        join(path, node.children[child]?.dynamic ? `:${child}` : child),
        route
      )
    }
  }
}
