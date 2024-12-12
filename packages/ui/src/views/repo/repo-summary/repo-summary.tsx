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
      <SandboxLayout.Columns columnWidths="1fr 330px">
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
                      <Button className="gap-x-2 px-3" variant="outline">
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
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 justify-between items-center">
                <Text size={3} className="tracking-snug text-foreground-1 col-span-2">
                  {t('views:repos.summary', 'Summary')}
                </Text>
                <Button variant="ghost" size="sm_icon" aria-label="More options">
                  <Icon name="more-dots-fill" size={12} className="text-icons-3" />
                </Button>
              </div>
              <div className="flex flex-col w-full py-3 px-4 bg-background-2 gap-y-4 border border-borders-1 rounded-md">
                <div className="flex justify-between items-center rounded-md w-full">
                  <Text size={2} className="leading-snug text-foreground-5">
                    {t('views:repos.commits', 'Commits')}
                  </Text>
                  <Text size={2} className="leading-snug text-white">
                    {default_branch_commit_count}
                  </Text>
                </div>
                <div className="flex justify-between items-center rounded-md w-full">
                  <Text size={2} className="leading-snug text-foreground-5">
                    {t('views:repos.branches', 'Branches')}
                  </Text>
                  <Text size={2} className="leading-snug text-white">
                    {branch_count}
                  </Text>
                </div>
                <div className="flex justify-between items-center rounded-md w-full">
                  <Text size={2} className="leading-snug text-foreground-5">
                    {t('views:repos.tags', 'Tags')}
                  </Text>
                  <Text size={2} className="leading-snug text-white">
                    {tag_count}
                  </Text>
                </div>
                <div className="flex justify-between items-center rounded-md w-full">
                  <Text size={2} className="leading-snug text-foreground-5">
                    {t('views:repos.open-prs', 'Open PRs')}
                  </Text>
                  <Text size={2} className="leading-snug text-white">
                    {pull_req_summary?.open_count || 1}
                  </Text>
                </div>
                <div className="flex justify-between items-center rounded-md w-full">
                  <Text size={2} className="leading-snug text-foreground-5">
                    AI To-dos
                  </Text>
                  <Text size={2} className="leading-snug text-white">
                    3
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 justify-between items-center">
                <Text size={3} className="tracking-snug text-foreground-1 col-span-2">
                  Code vulnerabilities
                </Text>
                <span className="rounded-full h-[22px] w-[22px] bg-background-2 text-14 border border-borders-1 flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="relative flex w-full p-4 bg-background-2 border border-borders-1 flex-col rounded-md overflow-hidden">
                  <div className="absolute -top-[35px] -right-[35px]">
                    <Icon name="demo-warning" size={108} />
                  </div>
                  <div className="flex flex-col gap-y-2.5">
                    <div className="flex items-end gap-x-2">
                      <Icon name="triangle-warning" size={16} className="text-[#E29B36]" />
                      <span className="leading-tight text-foreground-1 font-medium">package.json</span>
                    </div>
                    <span className="leading-tight text-[#E29B36]">1 critical vulnerability identified</span>
                  </div>
                  <Spacer size={4} />
                  <div>
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
                <div className="relative flex w-full p-4 bg-background-2 border border-borders-1 flex-col rounded-md overflow-hidden">
                  <div className="absolute -top-[35px] -right-[35px]">
                    <Icon name="demo-warning" size={108} />
                  </div>
                  <div className="flex flex-col gap-y-2.5">
                    <div className="flex items-end gap-x-2">
                      <Icon name="triangle-warning" size={16} className="text-[#BFAA8C]" />
                      <span className="leading-tight text-foreground-1 font-medium">.gitignore</span>
                    </div>
                    <span className="leading-tight text-[#BFAA8C]">1 medium vulnerability identified</span>
                  </div>
                  <Spacer size={4} />
                  <div>
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
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 justify-between items-center">
                <Text size={3} className="tracking-snug text-foreground-1 col-span-2">
                  Review PRs with AI
                </Text>
                <span className="rounded-full h-[22px] w-[22px] bg-background-2 text-14 border border-borders-1 flex items-center justify-center">
                  1
                </span>
              </div>
              <div className="flex w-full p-4 bg-background-2 border border-borders-1 flex-col rounded-md">
                <div className="flex flex-col gap-y-2.5">
                  <span className="leading-tight text-white">"Correct all CSS root vars for light mode"</span>
                  <span className="leading-tight text-foreground-5">Raised by ARamina</span>
                </div>
                <Spacer size={4} />
                <div>
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
            </div>
          </SandboxLayout.Content>
        </SandboxLayout.Column>
      </SandboxLayout.Columns>
    </SandboxLayout.Main>
  )
}
