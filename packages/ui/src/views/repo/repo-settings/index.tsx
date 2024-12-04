import { useRef } from 'react'

import { FormFieldSet } from '@/components'

// import { RepoSettingsGeneralDelete } from './repo-settings-general/repo-settings-general-delete'
import { RepoSettingsGeneralForm } from './components/repo-settings-general-form'
// import { RepoSettingsGeneralRules } from './repo-settings-general/repo-settings-general-rules'
// import {
//   RepoSettingsSecurityForm,
//   RepoSettingsSecurityFormFields
// } from './repo-settings-general/repo-settings-general-security'
import { ErrorTypes, RepoData, RepoUpdateData, RuleDataType } from './types'

interface ILoadingStates {
  isLoadingRepoData: boolean
  isUpdatingRepoData: boolean
  // isLoadingSecuritySettings: boolean
  // isUpdatingSecuritySettings: boolean
}
interface RepoSettingsGeneralPageProps {
  repoData: RepoData
  isLoadingRepoData: boolean
  // securityScanning: boolean
  //   handleUpdateSecuritySettings: (data: RepoSettingsSecurityFormFields) => void
  // handleRepoUpdate: (data: RepoUpdateData) => void
  // apiError: { type: ErrorTypes; message: string } | null
  // loadingStates: ILoadingStates
  // isRepoUpdateSuccess: boolean
  // rules: RuleDataType[] | null
  // handleRuleClick: (identifier: string) => void
  // openRulesAlertDeleteDialog: (identifier: string) => void
  // openRepoAlertDeleteDialog: () => void
}
const RepoSettingsGeneralPage: React.FC<RepoSettingsGeneralPageProps> = ({
  repoData,
  isLoadingRepoData
  // handleRepoUpdate,
  // securityScanning,
  //   handleUpdateSecuritySettings,
  // apiError,
  // loadingStates,
  // isRepoUpdateSuccess,
  // rules,
  // handleRuleClick
  // openRulesAlertDeleteDialog,
  // openRepoAlertDeleteDialog
}) => {
  // const rulesRef = useRef<HTMLDivElement | null>(null)
  // if (window.location.pathname.endsWith('/rules')) {
  //   rulesRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }
  console.log('repoData:', repoData)
  console.log('isLoadingRepoData:', isLoadingRepoData)
  return (
    <>
      <FormFieldSet.Root>
        <RepoSettingsGeneralForm
          repoData={repoData}
          isLoadingRepoData={isLoadingRepoData}
          // handleRepoUpdate={handleRepoUpdate}
          // apiError={apiError}
          // isLoadingRepoData={loadingStates.isLoadingRepoData}
          // isUpdatingRepoData={loadingStates.isUpdatingRepoData}
          // isRepoUpdateSuccess={isRepoUpdateSuccess}
        />

        <FormFieldSet.Separator />
        {/* <div ref={rulesRef}>
          <RepoSettingsGeneralRules
            rules={rules}
            apiError={apiError}
            handleRuleClick={handleRuleClick}
            openRulesAlertDeleteDialog={openRulesAlertDeleteDialog}
          />
        </div>

        <FormFieldSet.Separator />
        <RepoSettingsSecurityForm
          securityScanning={securityScanning}
          handleUpdateSecuritySettings={handleUpdateSecuritySettings}
          apiError={apiError}
          isUpdatingSecuritySettings={loadingStates.isUpdatingSecuritySettings}
          isLoadingSecuritySettings={loadingStates.isLoadingSecuritySettings}
        />
        <FormFieldSet.Separator />
        <RepoSettingsGeneralDelete apiError={apiError} openRepoAlertDeleteDialog={openRepoAlertDeleteDialog} /> */}
      </FormFieldSet.Root>
    </>
  )
}

export { RepoSettingsGeneralPage }
