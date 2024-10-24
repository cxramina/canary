import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogDescription,
  Button,
  Input,
  Spacer,
  Icon,
  ButtonGroup,
  Text
} from '@harnessio/canary'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFieldSet, MessageTheme } from '../..'
import { InfoCircle } from '@harnessio/icons-noir'

interface FormEditDialogProps {
  user: { uid: string; email: string; display_name?: string }
  onSave: () => void
  onClose: () => void
}

export const FormUserEditDialog: React.FC<FormEditDialogProps> = ({ user, onSave, onClose }) => {
  const newMemberSchema = z.object({
    userID: z.string().min(1, { message: 'Please provide a project name' }),
    email: z.string().min(1, { message: 'Please provide a valid email, ex: example@yourcompany.com' }),
    displayName: z.string().min(0, { message: 'optional' })
  })

  type MemberFields = z.infer<typeof newMemberSchema>

  //member form handling
  const {
    handleSubmit,
    register,
    reset: resetNewMemberForm,
    formState: { errors, isValid, isDirty }
  } = useForm<MemberFields>({
    resolver: zodResolver(newMemberSchema),
    mode: 'onChange',
    defaultValues: {
      userID: user.uid,
      email: user.email,
      displayName: user.display_name
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Form submit handler
  const onSubmit: SubmitHandler<MemberFields> = data => {
    setIsSubmitting(true)
    setTimeout(() => {
      onSave()
      setIsSubmitting(false)
      setSubmitted(true)
      resetNewMemberForm(data) // Reset to the current values
      setTimeout(() => setSubmitted(false), 2000)
    }, 2000)
  }

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update User</AlertDialogTitle>
        </AlertDialogHeader>

        {/* Accessibility: Add Description */}
        <AlertDialogDescription>Update the information for {user.uid} and confirm the changes.</AlertDialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldSet.Root className="mb-0">
            {/* User ID */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="userID" required>
                <div className="flex content-center items-center">
                  <Text className="font-normal text-primary/80">User ID</Text>
                  <InfoCircle size="15" className="text-tertiary-background ml-3" />
                  <Text size={1} className="text-tertiary-background ml-1">
                    User ID cannot be changed once created
                  </Text>
                </div>
              </FormFieldSet.Label>
              <Input
                id="userID"
                {...register('userID')}
                placeholder="Enter User ID"
                defaultValue={user.uid}
                className={user.uid ? 'cursor-not-allowed' : ''}
                disabled={user.uid ? true : false}
              />
              {errors.userID && (
                <FormFieldSet.Message theme={MessageTheme.ERROR}>
                  {errors.userID.message?.toString()}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* EMAIL */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="email" required>
                Email
              </FormFieldSet.Label>
              <Input id="email" {...register('email')} defaultValue={user.email} />
              {errors.email && (
                <FormFieldSet.Message theme={MessageTheme.ERROR}>
                  {errors.email.message?.toString()}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* Display Name */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="displayName">Display Name</FormFieldSet.Label>
              <Input
                id="displayName"
                {...register('displayName')}
                defaultValue={user.display_name}
                placeholder="Enter a display name"
              />
              {errors.displayName && (
                <FormFieldSet.Message theme={MessageTheme.ERROR}>
                  {errors.displayName.message?.toString()}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* Footer */}
            <Spacer size={5} />
            <FormFieldSet.ControlGroup>
              <AlertDialogFooter>
                <ButtonGroup.Root>
                  {!submitted ? (
                    <>
                      <AlertDialogCancel onClick={onClose} disabled={!isValid || isSubmitting}>
                        Cancel
                      </AlertDialogCancel>
                      <Button type="submit" theme="primary" disabled={!isValid || isSubmitting || !isDirty}>
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      type="button"
                      size="sm"
                      theme="success"
                      className="pointer-events-none"
                      disabled={submitted}>
                      Saved&nbsp;&nbsp;
                      <Icon name="tick" size={14} />
                    </Button>
                  )}
                </ButtonGroup.Root>
              </AlertDialogFooter>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
