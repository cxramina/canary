import React, { useState } from 'react'
import { pick } from 'lodash-es'
import {
  Spacer,
  ListActions,
  Button,
  SearchBox,
  Text,
  Icon,
  ButtonGroup,
  StackedList,
  IconProps
} from '@harnessio/canary'
import { Summary } from '../components/repo-summary'
import { RepoSummaryPanel } from '../components/repo-summary-panel'
import { BranchSelector } from '../components/branch-chooser'
import { FullWidth2ColumnLayout } from '../layouts/FullWidth2ColumnLayout'
import { mockFiles } from '../data/mockSummaryFiiles'
import { SandboxLayout } from '..'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'

const mockSummaryDetails: { id: string; name: string; count: number; iconName: IconProps['name'] }[] = [
  {
    id: '0',
    name: 'Commits',
    count: 594,
    iconName: 'tube-sign'
  },
  {
    id: '1',
    name: 'Branches',
    count: 27,
    iconName: 'branch'
  },
  {
    id: '2',
    name: 'Tags',
    count: 69,
    iconName: 'tag'
  },
  {
    id: '3',
    name: 'Open pull requests',
    count: 0,
    iconName: 'open-pr'
  }
]

const mockBranchList = [
  {
    name: 'main'
  },
  {
    name: 'new-feature'
  },
  {
    name: 'test-wip'
  },
  {
    name: 'display-db'
  }
]

function SandboxRepoSummaryPage() {
  const [loadState, setLoadState] = useState('float')

  return (
    <>
      {loadState.includes('sub') && (
        <SandboxLayout.LeftSubPanel hasHeader hasSubHeader>
          <div className="px-8 py-5">
            <Text as="p" size={2} className="text-primary/70">
              SubMenu
            </Text>
            <Text as="p" size={2} className="text-primary/70">
              2,000 pixels tall
            </Text>
            <div className="h-[2000px]" />
            <Text as="p" size={2} className="text-primary/70">
              End of SubMenu
            </Text>
          </div>
        </SandboxLayout.LeftSubPanel>
      )}
      <SandboxLayout.Content
        fullWidth={loadState.includes('full')}
        hasLeftPanel
        hasLeftSubPanel={loadState.includes('sub')}
        hasHeader
        hasSubHeader>
        <FullWidth2ColumnLayout
          leftColumn={
            <>
              <Spacer size={6} />
              <ListActions.Root>
                <ListActions.Left>
                  <ButtonGroup.Root>
                    <BranchSelector name={'main'} branchList={mockBranchList} />
                    <SearchBox.Root placeholder="Search" />
                  </ButtonGroup.Root>
                </ListActions.Left>
                <ListActions.Right>
                  <ButtonGroup.Root>
                    <Button variant="outline">
                      Add file&nbsp;&nbsp;
                      <Icon name="chevron-down" size={11} className="chevron-down" />
                    </Button>
                    <Button variant="default">Clone repository</Button>
                  </ButtonGroup.Root>
                </ListActions.Right>
              </ListActions.Root>
              <Spacer size={5} />
              <Summary
                files={mockFiles}
                latestFile={pick(mockFiles[0], ['user', 'lastCommitMessage', 'timestamp', 'sha'])}
              />
              <Spacer size={12} />
              <StackedList.Root>
                <StackedList.Item isHeader disableHover>
                  <StackedList.Field title={<Text color="tertiaryBackground">README.md</Text>} />
                </StackedList.Item>
                <StackedList.Item disableHover>
                  {/* Dummy WYSIWYG content */}
                  <div className="flex flex-col gap-4 px-3 py-2">
                    <Text size={5} weight="medium">
                      Pixel Point — Web Design and Development
                    </Text>
                    <Text size={3}>Table of Contents</Text>
                    <ul className="flex flex-col gap-1">
                      <li>
                        <Text weight="normal" className="text-primary/80">
                          - Welcome
                        </Text>
                      </li>
                      <li>
                        <Text weight="normal" className="text-primary/80">
                          - Getting started
                        </Text>
                      </li>
                      <li>
                        <Text weight="normal" className="text-primary/80">
                          - Usage
                        </Text>
                      </li>
                    </ul>
                    <Text size={3} weight="medium">
                      Welcome
                    </Text>
                    <Text className="text-primary/80">
                      Below you will find some basic information about how to work with this project. If you've spotted
                      a bug, a copywriting mistake or just want to suggest some better solution, please, refer to the
                      contribution section.
                    </Text>
                    <Text className="text-primary/80">
                      Hello there! This repo is a home to Pixel Point, a web agency that designs and develops
                      world-class marketing websites. We made this codebase available to open source community so
                      everyone can get something useful out of our expertise, be it for project structure, code patterns
                      or plugins.
                    </Text>
                  </div>
                </StackedList.Item>
              </StackedList.Root>
            </>
          }
          rightColumn={<RepoSummaryPanel title="Summary" timestamp={'May 6, 2024'} details={mockSummaryDetails} />}
        />
      </SandboxLayout.Content>
      <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export { SandboxRepoSummaryPage }
