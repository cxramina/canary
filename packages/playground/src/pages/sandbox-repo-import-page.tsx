import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
  Checkbox,
  Spacer
} from '@harnessio/canary'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormFieldSet } from '../index'
import { SandboxLayout } from '../..'

const importRepoFormSchema = z.object({
  identifier: z.string(),
  description: z.string(),
  pipelines: z.boolean().optional(),
  authorization: z.boolean().optional(),
  provider: z.string().min(1, { message: 'Please select a provider' }),
  password: z.string().optional(),
  organization: z.string().min(1, { message: 'Please select an organization' }),
  repository: z.string().min(1, { message: 'Please select a repository' })
})

export type ImportRepoFormType = z.infer<typeof importRepoFormSchema>

export function SandboxRepoImportPage({ isLoading = false }: { isLoading?: boolean }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ImportRepoFormType>({
    resolver: zodResolver(importRepoFormSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      description: '',
      pipelines: false,
      authorization: false,
      provider: 'Github',
      password: '',
      organization: '',
      repository: ''
    }
  })

  const providerValue = watch('provider')

  const providerOptions = [
    `Github`,
    `Gitlab`,
    `Bitbucket`,
    `Azure DevOps`,
    `Github Enterprise`,
    `Gitlab Self-Hosted`,
    `Bitbucket Server`,
    `Gitea`,
    `Gogs`
  ]

  const repositoryValue = watch('repository')

  useEffect(() => {
    setValue('identifier', repositoryValue)
  }, [repositoryValue, setValue])

  const handleSelectChange = (fieldName: keyof ImportRepoFormType, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  const handleFormSubmit: SubmitHandler<ImportRepoFormType> = data => {
    console.log(data)
    reset()
  }

  const handleCancel = () => {}

  return (
    <>
      <SandboxLayout.Main hasLeftPanel hasHeader>
        <SandboxLayout.Content maxWidth="2xl">
          <Spacer size={10} />
          <Text size={6} weight={'medium'}>
            Import a repository
          </Text>
          <Spacer size={8} />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="provider">Provider</FormFieldSet.Label>
                <Select value={providerValue} onValueChange={value => handleSelectChange('provider', value)}>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {providerOptions.map(providerOption => {
                      return (
                        <SelectItem key={providerOption} value={providerOption}>
                          {providerOption}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                {errors.provider && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.provider.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>

            {/* Org */}
            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="organization" required>
                  Organization
                </FormFieldSet.Label>
                <Input id="organization" {...register('organization')} placeholder="Enter the organization name" />
                {errors.organization && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.organization.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>

            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="repository" required>
                  Repository
                </FormFieldSet.Label>
                <Input id="repository" {...register('repository')} placeholder="Enter the repository name" />
                {errors.repository && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.repository.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>

            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup className="flex flex-row gap-5">
                <FormFieldSet.Option
                  control={
                    <Checkbox
                      {...register('authorization')}
                      id="authorization"
                      checked={watch('authorization')}
                      onCheckedChange={(checked: boolean) => setValue('authorization', checked)}
                    />
                  }
                  id="authorization"
                  label="Requires Authorization"
                  className="min-h-8 mt-0 flex items-center"
                />

                <FormFieldSet.Option
                  control={
                    <Checkbox
                      {...register('pipelines')}
                      id="pipelines"
                      checked={watch('pipelines')}
                      onCheckedChange={(checked: boolean) => setValue('pipelines', checked)}
                    />
                  }
                  // id={`${event.id}`}
                  id="pipelines"
                  label="Import Pipelines"
                  className="min-h-8 mt-0 flex items-center"
                />
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>

            {watch('authorization') && (
              <FormFieldSet.Root>
                <FormFieldSet.ControlGroup>
                  <FormFieldSet.Label htmlFor="password">Token</FormFieldSet.Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="Enter your access token"
                  />
                  {errors.password && (
                    <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                      {errors.password.message?.toString()}
                    </FormFieldSet.Message>
                  )}
                </FormFieldSet.ControlGroup>
              </FormFieldSet.Root>
            )}

            <FormFieldSet.Separator />

            <FormFieldSet.Root className="mt-8">
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="identifier" required>
                  Name
                </FormFieldSet.Label>
                <Input id="identifier" {...register('identifier')} placeholder="Enter the repository name" />
                {errors.identifier && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.identifier.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>

            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="description">Description</FormFieldSet.Label>
                <Input id="description" {...register('description')} placeholder="Enter a description" />
                {errors.description && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.description.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>

            {/* SUBMIT BUTTONS */}
            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <ButtonGroup.Root className="justify-end">
                  <>
                    <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" disabled={isLoading}>
                      {!isLoading ? 'Import Repository' : 'Importing...'}
                    </Button>
                  </>
                </ButtonGroup.Root>
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>
          </form>
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}
