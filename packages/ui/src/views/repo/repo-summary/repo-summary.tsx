/* eslint-disable @typescript-eslint/no-unused-vars */

import { useNavigate } from 'react-router-dom'

import {
  Badge,
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  ListActions,
  NoData,
  SearchFiles,
  SkeletonList,
  Spacer,
  StackedList,
  Text
} from '@/components'
import { IBranchSelectorStore, RepoFile, SandboxLayout, TranslationStore } from '@/views'
import { BranchSelector, Summary } from '@/views/repo/components'

import SummaryPanel from './components/summary-panel'

export interface RepoSummaryViewProps {
  loading: boolean
  filesList: string[]
  navigateToFile: (path: string) => void
  repository:
    | {
        git_ssh_url?: string
        git_url?: string
        description?: string
      }
    | undefined
  handleCreateToken: () => void
  // TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repoEntryPathToFileTypeMap: Map<string, any>
  files: RepoFile[]
  decodedReadmeContent: string
  summaryDetails: {
    default_branch_commit_count?: number
    branch_count?: number
    tag_count?: number
    pull_req_summary?: { open_count: number } | undefined
  }
  gitRef?: string
  latestCommitInfo?: {
    userName: string
    message: string
    timestamp: string
    sha: string | null
  }
  onChangeDescription?: () => void
  isEditingDescription?: boolean
  setIsEditingDescription: (value: boolean) => void
  saveDescription: (description: string) => void
  useRepoBranchesStore: () => IBranchSelectorStore
  useTranslationStore: () => TranslationStore
}

export function RepoSummaryView({
  loading,
  filesList,
  navigateToFile,
  repository,
  repoEntryPathToFileTypeMap,
  files,
  summaryDetails: { default_branch_commit_count = 0, branch_count = 0, tag_count = 0, pull_req_summary },
  gitRef,
  latestCommitInfo,
  onChangeDescription,
  isEditingDescription,
  setIsEditingDescription,
  saveDescription,
  useTranslationStore,
  useRepoBranchesStore
}: RepoSummaryViewProps) {
  const navigate = useNavigate()
  const { t } = useTranslationStore()
  const { repoId, spaceId, selectedBranchTag } = useRepoBranchesStore()

  if (loading) return <SkeletonList />

  if (!repoEntryPathToFileTypeMap.size) {
    return (
      <NoData
        insideTabView
        iconName="no-data-folder"
        title="No files yet"
        description={['There are no files in this repository yet.', 'Create new or import an existing file.']}
        primaryButton={{ label: 'Create file' }}
        secondaryButton={{ label: 'Import file' }}
      />
    )
  }

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader fullWidth>
      <SandboxLayout.Columns columnWidths="1fr 220px">
        <SandboxLayout.Column>
          <SandboxLayout.Content>
            <ListActions.Root>
              <ListActions.Left>
                <ButtonGroup>
                  <BranchSelector
                    useRepoBranchesStore={useRepoBranchesStore}
                    useTranslationStore={useTranslationStore}
                  />
                  <SearchFiles
                    navigateToFile={navigateToFile}
                    filesList={filesList}
                    useTranslationStore={useTranslationStore}
                  />
                </ButtonGroup>
              </ListActions.Left>
              <ListActions.Right>
                <ButtonGroup>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="gap-x-2" variant="outline">
                        {t('views:repos.add-file', 'Add file')}
                        <Icon name="chevron-down" size={11} className="chevron-down" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        key={'create-file'}
                        onClick={() => {
                          navigate(`/${spaceId}/repos/${repoId}/code/new/${gitRef || selectedBranchTag?.name || ''}/~/`)
                        }}
                      >
                        {t('views:repos.createNewFile', '+ Create New File')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/*
                    TODO: require moving and preparing a component from views
                    <CloneRepoDialog
                      sshUrl={repository?.git_ssh_url ?? 'could not fetch url'}
                      httpsUrl={repository?.git_url ?? 'could not fetch url'}
                      handleCreateToken={handleCreateToken}
                    />
                   */}
                </ButtonGroup>
              </ListActions.Right>
            </ListActions.Root>
            <Spacer size={5} />
            <Summary
              latestFile={{
                user: { name: latestCommitInfo?.userName || '' },
                lastCommitMessage: latestCommitInfo?.message || '',
                timestamp: latestCommitInfo?.timestamp || '',
                sha: latestCommitInfo?.sha || ''
              }}
              files={files}
              useTranslationStore={useTranslationStore}
            />
            <Spacer size={5} />
            <StackedList.Root>
              <StackedList.Item isHeader disableHover>
                <StackedList.Field
                  title={<Text color="tertiaryBackground">{t('views:repos.readme', 'README.md')}</Text>}
                />
                {/* TODO: add component and file editing logic */}
                <StackedList.Field right />
              </StackedList.Item>
              <StackedList.Item disableHover>
                {/*
                  TODO: require moving and preparing a component from views
                  <MarkdownViewer source={decodedReadmeContent || ''} />
                */}
              </StackedList.Item>
            </StackedList.Root>
          </SandboxLayout.Content>
        </SandboxLayout.Column>
        <SandboxLayout.Column>
          <SandboxLayout.Content className="sticky top-[100px] pl-0 flex flex-col gap-7">
            {/* <SummaryPanel
              title={t('views:repos.summary', 'Summary')}
              details={[
                {
                  id: '0',
                  name: t('views:repos.commits', 'Commits'),
                  count: default_branch_commit_count,
                  iconName: 'tube-sign'
                },
                {
                  id: '1',
                  name: t('views:repos.branches', 'Branches'),
                  count: branch_count,
                  iconName: 'branch'
                },
                {
                  id: '2',
                  name: t('views:repos.tags', 'Tags'),
                  count: tag_count,
                  iconName: 'tag'
                },
                {
                  id: '3',
                  name: t('views:repos.openPullReq', 'Open pull requests'),
                  count: pull_req_summary?.open_count || 0,
                  iconName: 'open-pr'
                }
              ]}
              description={repository?.description}
              onChangeDescription={onChangeDescription}
              isEditingDescription={isEditingDescription}
              setIsEditingDescription={setIsEditingDescription}
              saveDescription={saveDescription}
            /> */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 justify-between items-center">
                <Text size={3} className="tracking-snug text-foreground-1 col-span-2">
                  {t('views:repos.summary', 'Summary')}
                </Text>
                <Button variant="ghost" size="sm_icon" aria-label="More options">
                  <Icon name="more-dots-fill" size={12} className="text-icons-3" />
                </Button>
              </div>
              <div className="relative flex w-full py-3 px-2.5 bg-background-4 flex-col gap-y-3 gap-x-2.5 text-center border rounded-md items-start">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col justify-center rounded-md bg-background-4/90 py-1 px-3">
                    <Text size={3} className="leading-snug">
                      {default_branch_commit_count}
                    </Text>
                    <Text size={1} className="leading-snug text-foreground-5">
                      {t('views:repos.commits', 'Commits')}
                    </Text>
                  </div>
                  <div className="flex flex-col justify-center rounded-md bg-background-4/80 py-1 px-3">
                    <Text size={3} className="leading-snug">
                      {branch_count}
                    </Text>
                    <Text size={1} className="leading-snug text-foreground-5">
                      {t('views:repos.branches', 'Branches')}
                    </Text>
                  </div>
                  <div className="flex flex-col justify-center rounded-md bg-background-4/80 py-1 px-3">
                    <Text size={3} className="leading-snug">
                      {tag_count}
                    </Text>
                    <Text size={1} className="leading-snug text-foreground-5">
                      {t('views:repos.tags', 'Tags')}
                    </Text>
                  </div>
                  <div className="flex flex-col justify-center rounded-md bg-background-4/80 py-1 px-3">
                    <Text size={3} className="leading-snug">
                      {pull_req_summary?.open_count || 0}
                    </Text>
                    <Text size={1} className="leading-snug  text-foreground-5">
                      Open PRs
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 justify-between items-center">
                <Text size={3} className="tracking-snug text-foreground-1 col-span-2">
                  Code vulnerabilities
                </Text>
                <Badge size={'sm'} theme="emphasis">
                  3
                </Badge>
              </div>
              <div className="flex flex-col gap-5">
                <div className="relative flex w-full py-5 px-5 bg-background-4 flex-col items-center gap-2.5 text-center border rounded-md">
                  <div className="flex flex-col items-center gap-1">
                    <Text className="leading-snug text-foreground-1" size={2} weight="normal">
                      Package.json
                    </Text>
                    <Spacer size={2} />
                    <Text className="leading-snug text-destructive" size={1}>
                      1 critical issue
                    </Text>
                    <Spacer size={3} />
                    <Button
                      className="bg-background-7 text-12 font-medium"
                      borderRadius="full"
                      size="default"
                      padding="sm"
                      variant="gradient-border"
                      gradientType="ai-button"
                    >
                      <Icon className="mr-1.5" name="sparks" size={12} />
                      Preview fix
                    </Button>
                  </div>
                </div>
                <div className="relative flex w-full py-5 px-5 bg-background-4 flex-col items-center gap-2.5 text-center border rounded-md">
                  <div className="flex flex-col items-center gap-1">
                    <Text className="leading-snug text-foreground-1" size={2} weight="normal">
                      App.tsx
                    </Text>
                    <Spacer size={2} />
                    <Text className="leading-snug text-warning" size={1}>
                      2 medium issues
                    </Text>
                    <Spacer size={3} />
                    <Button
                      className="bg-background-7 text-12 font-medium"
                      borderRadius="full"
                      size="default"
                      padding="sm"
                      variant="gradient-border"
                      gradientType="ai-button"
                    >
                      <Icon className="mr-1.5" name="sparks" size={12} />
                      Preview fixes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 justify-between items-center">
                <Text size={3} className="tracking-snug text-foreground-1 col-span-2">
                  Review PRs with AI
                </Text>
                <Badge size={'sm'} theme="emphasis">
                  1
                </Badge>
              </div>
              <div className="relative flex w-full py-5 px-5 bg-background-4 flex-col items-center gap-2.5 text-center border rounded-md">
                <div className="flex flex-col items-center gap-1">
                  <Text className="leading-snug text-foreground-1" size={2} weight="normal">
                    "Correct all CSS root vars for light mode"
                  </Text>
                  <Spacer size={2} />
                  <Text className="leading-snug text-foreground-4" size={1}>
                    Raised by ARamina
                  </Text>
                  <Spacer size={3} />
                  <Button
                    className="bg-background-7 text-12 font-medium"
                    borderRadius="full"
                    size="default"
                    padding="sm"
                    variant="gradient-border"
                    gradientType="ai-button"
                  >
                    <Icon className="mr-1.5" name="sparks" size={12} />
                    Start AI review
                  </Button>
                </div>
              </div>
            </div>
          </SandboxLayout.Content>
        </SandboxLayout.Column>
      </SandboxLayout.Columns>
    </SandboxLayout.Main>
  )
}
