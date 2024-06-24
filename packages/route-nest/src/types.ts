export enum RouteTypes {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export type RouteHandler = (
  request: Request,
  response: Response,
  next: RouteHandler
) => void

export interface TreeNode {
  handlers: Record<RouteTypes, RouteHandler | null>
  children: Record<string, TreeNode>
  middlewares: RouteHandler[]
  dynamic: boolean
}
