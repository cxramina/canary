import { cloneDeep, get, isArray, pick, set, unset } from 'lodash-es'

import { IFormDefinition, IInputDefinition } from '../../types/types'
import { removeTemporaryFieldsValue } from './temporary-field-utils'

type TransformItem = {
  path: string
  /** level is used to sort transformers in order to execute them form leaf to root.*/
  level: number
  isPrimitive: boolean
  inputTransform?: IInputDefinition['inputTransform']
  outputTransform?: IInputDefinition['outputTransform']
}

/** convert data model to form model using input transformer functions */
export function inputTransformValues(values: Record<string, any>, transformerItems: TransformItem[]) {
  const retValues = cloneDeep(values)
  transformerItems.forEach(transformItem => {
    if (transformItem.inputTransform) {
      const inputTransform = isArray(transformItem.inputTransform)
        ? transformItem.inputTransform
        : [transformItem.inputTransform]

      inputTransform.forEach(inTransform => {
        // IMPORTANT: Check if we're accessing a child property of a primitive
        // If so, don't call get() as it would access prototype methods
        let rawValue: any
        const pathParts = transformItem.path.split('.')

        if (pathParts.length > 1) {
          const parentPath = pathParts.slice(0, -1).join('.')
          const parentValue = get(retValues, parentPath)

          // If parent is primitive, pass undefined to avoid prototype access
          // The transformer will read the parent directly if it needs to
          if (typeof parentValue === 'string' || typeof parentValue === 'number' || typeof parentValue === 'boolean') {
            rawValue = undefined
          } else {
            rawValue = get(retValues, transformItem.path)
          }
        } else {
          rawValue = get(retValues, transformItem.path)
        }

        const transformedObj = inTransform(rawValue, retValues)
        if (transformedObj) {
          set(retValues, transformedObj.path ?? transformItem.path, transformedObj.value)
        }
      })
    }
  })
  return retValues
}

/** convert form model to data model using output transformer functions  */
export function outputTransformValues(values: Record<string, any>, transformerItems: TransformItem[]) {
  const pathsToUnset: string[] = []

  const retValues = cloneDeep(values)
  transformerItems.forEach(transformItem => {
    if (transformItem.outputTransform) {
      const outputTransform = isArray(transformItem.outputTransform)
        ? transformItem.outputTransform
        : [transformItem.outputTransform]

      outputTransform.forEach(outTransform => {
        const rawValue = get(retValues, transformItem.path)
        const transformedObj = outTransform(rawValue, retValues)
        if (transformedObj) {
          if (transformedObj.path) {
            set(retValues, transformedObj.path, transformedObj.value)
            if (transformedObj.unset) {
              pathsToUnset.push(transformItem.path)
            }
          } else {
            set(retValues, transformItem.path, transformedObj.value)
          }
        }
      })
    }
  })

  pathsToUnset.forEach(path => {
    unset(retValues, path)
  })

  return retValues
}

function flattenInputsRec(inputs: IInputDefinition[]): IInputDefinition[] {
  const flattenInputs = inputs.reduce<IInputDefinition[]>((acc, input) => {
    if (Array.isArray(input.inputs)) {
      return [...acc, input, ...flattenInputsRec(input.inputs)]
    } else {
      return [...acc, input]
    }
  }, [])

  return flattenInputs
}

/** Collect all input/output transformer functions  */
export function getTransformers(formDefinition: IFormDefinition): TransformItem[] {
  const flattenInputs = flattenInputsRec(formDefinition.inputs)

  const ret = flattenInputs.reduce<TransformItem[]>((acc, input) => {
    // TODO: has to be abstracted
    const isPrimitive =
      input.inputType === 'text' ||
      input.inputType === 'boolean' ||
      input.inputType === 'number' ||
      input.inputType === 'textarea' ||
      input.inputType === 'select'

    if (input.inputTransform || input.outputTransform) {
      acc.push({
        ...pick(input, 'path', 'inputTransform', 'outputTransform'),
        level: input.path.split('.').length,
        isPrimitive
      })
    }

    return acc
  }, [])

  ret.sort((a, b) => {
    if (a.level === b.level) return !a.isPrimitive ? -1 : 1
    return a.level < b.level ? -1 : 1 // Shallower first (parent before child)
  })

  return ret
}

/** Remove values for inputs that are hidden  */
export function unsetHiddenInputsValues(
  formDefinition: IFormDefinition,
  values: Record<string, any>,
  metadata?: any,
  options: { preserve?: string[] } = {}
): Record<string, any> {
  const { preserve } = options

  const flattenInputs = flattenInputsRec(formDefinition.inputs)

  const retValues = cloneDeep(values)

  flattenInputs.forEach(input => {
    if (preserve && preserve.includes(input.path)) {
      return
    }

    if (!!input.isVisible && !input.isVisible(values, metadata)) {
      unset(retValues, input.path)
    }
  })

  return retValues
}

/** Convert data to form model  */
export function convertDataToFormModel(
  inputData: Record<string, any>,
  formDefinition: IFormDefinition
): Record<string, any> {
  const transformers = getTransformers(formDefinition)
  return inputTransformValues(inputData, transformers)
}

/** Convert form model to data  */
export function convertFormModelToData(
  formData: Record<string, any>,
  formDefinition: IFormDefinition,
  metadata?: any,
  options: {
    /* path to preserve */
    preserve?: string[]
  } = {}
): Record<string, any> {
  const transformers = getTransformers(formDefinition)
  let data = unsetHiddenInputsValues(formDefinition, formData, metadata, options)
  data = outputTransformValues(data, transformers)
  data = removeTemporaryFieldsValue(data)
  return data
}
