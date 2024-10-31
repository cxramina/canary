import React, { useState } from 'react'
import {
  Spacer,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  Button,
  Badge,
  Text,
  Icon
} from '@harnessio/canary'
import { FormResetPasswordsDialogProps } from './interfaces'
import { CopyButton } from '../copy-button'

export const FormResetPasswordDialog: React.FC<FormResetPasswordsDialogProps> = ({ user, onClose }) => {
  const [isConfirm, setIsConfirm] = useState(false)

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {isConfirm ? (
            <AlertDialogTitle>Reset Password</AlertDialogTitle>
          ) : (
            <AlertDialogTitle>
              Are you sure you want to reset password for
              <Badge type="admin" className="mx-2" variant="muted" disableHover={true}>
                <Text>{user?.display_name}</Text>
              </Badge>
              ?
            </AlertDialogTitle>
          )}
          <AlertDialogDescription>
            {isConfirm
              ? `Your password has been generated. Please make sure to copy and store your password somewhere safe, you won't be able to see it again.`
              : `This will give you a new password to support "${user?.display_name}" (${user?.uid}) to reset the current
            password.`}
            {isConfirm && (
              <div className="grid grid-cols-10 gap-3 items-center mt-7">
                <div className="col-span-9 border-2 py-1 px-2 grid grid-cols-6 items-center rounded-md">
                  <Text size={2} weight="medium" className="text-muted-foreground col-span-5">
                    EFLSNKENJPOFIJ
                  </Text>
                  <CopyButton name="EFLSNKENJPOFIJ" className="col-span-1 justify-end" />
                </div>
                <Icon name="success" className="items-center col-span-1" />
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{isConfirm ? `Close` : `Cancel`}</AlertDialogCancel>
          {!isConfirm && (
            <Button size="default" theme="secondary" className="self-start" onClick={() => setIsConfirm(true)}>
              Confirm
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
