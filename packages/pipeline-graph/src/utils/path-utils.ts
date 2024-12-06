import { NodeContent } from '../types/node-content'
import { AnyNodeType } from '../types/nodes'
import { AnyNodeInternal } from '../types/nodes-internal'

/** addPaths mutates nodes */
export function addPaths(
  nodes: AnyNodeType[],
  nodesBank: Record<string, NodeContent>,
  parentPath: string,
  addUid: boolean
): AnyNodeInternal[] {
  const nodesInternal = nodes as AnyNodeInternal[]

  nodesInternal.map((node, idx) => {
    const currPath = `${parentPath}.children.${idx}`

    // set path and containerType
    node.path = currPath
    node.containerType = nodesBank[node.type].containerType

    if ('children' in node) {
      addPaths(node.children, nodesBank, currPath, addUid)
    }
  })

  return nodesInternal
}

/** path has to point to array element */
export function getPathPeaces(path: string) {
  const peaces = path.split('.')

  if (peaces.length === 1) {
    console.log({ index: parseInt(path) })
    return { index: parseInt(path) }
  }

  const index = parseInt(peaces.pop() as string)
  const arrayPath = peaces.join('.')

  return { arrayPath, index }
}
