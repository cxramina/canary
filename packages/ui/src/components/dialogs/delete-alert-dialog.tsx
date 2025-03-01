import { FC } from 'react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Spacer,
  Text
} from '@/components'
import { TranslationStore } from '@views/repo'

interface DeleteAlertDialogProps {
  open: boolean
  onClose: () => void
  identifier?: string
  deleteFn: (id: string) => void
  type?: string
  isLoading?: boolean
  error?: { type: string; message: string } | null
  useTranslationStore: () => TranslationStore
}
export const DeleteAlertDialog: FC<DeleteAlertDialogProps> = ({
  open,
  onClose,
  identifier,
  deleteFn,
  type,
  isLoading = false,
  useTranslationStore,
  error
}) => {
  const { t } = useTranslationStore()

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('component:deleteDialog.title', 'Are you sure?')}</AlertDialogTitle>
          <AlertDialogDescription>
            {type
              ? t('component:deleteDialog.descriptionWithType', {
                  defaultValue: `This will permanently delete your ${type} and remove all data. This action cannot be undone.`,
                  type: type
                })
              : t(
                  'component:deleteDialog.description',
                  `This will permanently remove all data. This action cannot be undone.`
                )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <>
          {error && (error.type === 'tokenDelete' || error.type === 'keyDelete') && (
            <>
              <Text size={1} className="text-destructive">
                {error.message}
              </Text>
              <Spacer size={4} />
            </>
          )}
        </>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {t('component:deleteDialog.cancel', 'Cancel')}
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={() => {
              deleteFn(identifier!)
            }}
          >
            {isLoading ? `Deleting ${type}...` : `Yes, delete ${type}`}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
