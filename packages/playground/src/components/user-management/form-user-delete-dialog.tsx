import React from 'react'

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
  Icon
} from '@harnessio/canary'
import { FormDeleterDialogProps } from './interfaces'

//Form Delete Member Dialog
export const FormDeleteUserDialog: React.FC<FormDeleterDialogProps> = ({
  user,
  onClose,
  onDelete,
  isDeleting,
  deleteSuccess
}) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to remove "{user?.display_name}"?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove the user "{user?.display_name}" from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          {!isDeleting && !deleteSuccess && <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>}
          {deleteSuccess ? (
            <Button size="default" theme="success" className="self-start pointer-events-none">
              Users removed&nbsp;&nbsp;
              <Icon name="tick" size={14} />
            </Button>
          ) : (
            <Button size="default" theme="error" className="self-start" onClick={onDelete} disabled={isDeleting}>
              {isDeleting ? 'Removing user...' : 'Yes, remove user'}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
