import { useCallback } from 'react'
import { toNestErrors } from '@hookform/resolvers'
import type { FieldValues, Resolver, ResolverOptions } from 'react-hook-form'

import type { IFormDefinition } from '../../types/types'
import { getValidationSchema } from '../validation/zod-validation'
import { isZodError, parseErrorSchema } from './zood-resolver-utils'

export function useZodValidationResolver(formDefinition: IFormDefinition): Resolver<any, any> | undefined {
  return useCallback(
    async (data: FieldValues, _: any, options: ResolverOptions<FieldValues>) => {
      try {
        const validationSchema = getValidationSchema(formDefinition, data)

        const values = await validationSchema.parseAsync(data)

        return {
          values,
          errors: {}
        }
      } catch (error: any) {
        if (isZodError(error)) {
          return {
            values: {},
            errors: toNestErrors(parseErrorSchema(error.errors, true), options)
          }
        }

        throw error
      }
    },
    [formDefinition]
  )
}
