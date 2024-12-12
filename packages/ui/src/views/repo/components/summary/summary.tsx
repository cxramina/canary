import { useNavigate } from 'react-router-dom'

import {
  Badge,
  Button,
  Icon,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text
} from '@/components'
import { LatestFileTypes, RepoFile, SummaryItemType, TranslationStore } from '@/views'
import { FileLastChangeBar } from '@views/repo/components'

interface SummaryProps {
  latestFile: LatestFileTypes
  files: RepoFile[]
  useTranslationStore: () => TranslationStore
}

export const Summary = ({ latestFile, files, useTranslationStore }: SummaryProps) => {
  const navigate = useNavigate()
  const { t } = useTranslationStore()

  return (
    <>
      <FileLastChangeBar useTranslationStore={useTranslationStore} {...latestFile} />
      <Table variant="asStackedList">
        <TableHeader>
          <TableRow>
            <TableHead>{t('views:repos.name', 'Name')}</TableHead>
            <TableHead>{t('views:repos.lastCommit', 'Last commit message')}</TableHead>
            <TableHead className="text-right">{t('views:repos.date', 'Date')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map(file => (
            <TableRow key={file.id} onClick={() => navigate(file.path)}>
              <TableCell>
                <div className="flex cursor-pointer items-center gap-1.5">
                  <Icon
                    className={
                      file.name === '.gitignore'
                        ? 'text-foreground-alert'
                        : file.name === 'package.json'
                          ? 'text-foreground-danger'
                          : 'text-icons-7'
                    }
                    name={file.type === SummaryItemType.File ? 'file' : 'folder'}
                    size={16}
                  />
                  <Text
                    truncate
                    className={`truncate max-w-52 ${
                      file.name === '.gitignore'
                        ? 'text-foreground-alert'
                        : file.name === 'package.json'
                          ? 'text-foreground-danger'
                          : 'text-primary'
                    }`}
                  >
                    {file.name}
                  </Text>
                </div>
              </TableCell>
              <TableCell>
                <Text color="tertiaryBackground" className="inline-flex gap-2.5 line-clamp-1">
                  {(file.name === 'package.json' || file.name === '.gitignore') && (
                    <>
                      {file.name === '.gitignore' && (
                        <Text size={2} className="text-foreground-alert">
                          Medium code vulnerability detected
                        </Text>
                      )}
                      {file.name !== '.gitignore' && (
                        <Text size={2} className="text-foreground-danger">
                          Critical code vulnerability detected
                        </Text>
                      )}
                      &nbsp;&middot;&nbsp;
                    </>
                  )}
                  {file.lastCommitMessage}
                </Text>
                {file.name === 'package.json' || file.name === '.gitignore' ? (
                  <>
                    <Spacer size={2} />
                    <div className="flex items-center gap-3 h-full mt-1 py-1 w-full justify-between">
                      <Button
                        className="bg-background-7 text-12 font-medium"
                        borderRadius="full"
                        padding="sm"
                        variant="gradient-border"
                        gradientType="ai-button"
                      >
                        <Icon className="mr-1.5" name="sparks" size={12} />
                        Preview fix
                      </Button>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </TableCell>
              <TableCell className="text-right">
                <Text color="tertiaryBackground" wrap="nowrap">
                  {file.timestamp}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
