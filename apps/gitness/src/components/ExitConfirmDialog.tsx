import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@harnessio/canary'
import { ExitConfirmOptions } from '../framework/context/ExitConfirmContext'

export type ExitConfirmDialogProps = ExitConfirmOptions & { open: boolean }

export function ExitConfirmDialog({
  open,
  title,
  subtitle,
  cancelText,
  confirmText,
  onCancel,
  onConfirm
}: ExitConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        if (!open) onCancel?.()
      }}>
      <DialogContent className="max-w-[500px] bg-primary-background border-border">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{subtitle}</DialogDescription>
        <DialogFooter>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onConfirm} variant="secondary">
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
