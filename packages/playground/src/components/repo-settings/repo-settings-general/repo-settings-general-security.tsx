import React from 'react'
import { Text, Checkbox } from '@harnessio/canary'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { FormFieldSet } from '../../../index'

const formSchema = z.object({
  secretScanning: z.boolean().optional()
})

export type FormFields = z.infer<typeof formSchema> // Automatically generate a type from the schema

interface RepoSettingsSecurityFormProps {
  // onFormSubmit?: (data: FormFields) => void
  // apiError: string | null
}
export const RepoSettingsSecurityForm: React.FC<RepoSettingsSecurityFormProps> = (
  {
    // onFormSubmit apiError = null
  }
) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      secretScanning: false
    }
  })
  const onCheckboxChange = (checked: boolean) => {
    setValue('secretScanning', checked)
    handleSubmit(data => {
      console.log(data)
      // onFormSubmit(data)
    })()
  }
  return (
    <>
      <Text size={4} weight="medium">
        Security
      </Text>
      <FormFieldSet.Root className="mb-0">
        <FormFieldSet.ControlGroup>
          <FormFieldSet.Option
            className="mt-0"
            control={
              <Checkbox checked={watch('secretScanning')} id="secret-scanning" onCheckedChange={onCheckboxChange} />
            }
            id="secret-scanning"
            label="Secret scanning"
            description="Block commits containing secrets like passwords, API keys and tokens."
          />
        </FormFieldSet.ControlGroup>

        {/* {apiError && (
          <>
            <Spacer size={2} />
            <Text size={1} className="text-destructive">
              {apiError?.toString()}
            </Text>
          </>
        )} */}
      </FormFieldSet.Root>
    </>
  )
}
