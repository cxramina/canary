import { IconProps } from '@harnessio/canary'

export const navbarSubmenuData: {
  groupId: number
  title: string
  items: { id: number; iconName: IconProps['name']; title: string; description: string; to: string }[]
}[] = [
  {
    groupId: 0,
    title: 'DevOps Modernization',
    items: [
      {
        id: 0,
        iconName: 'sub-rocket',
        title: 'Continuous Delivery & GitOps',
        description: 'App to production with no scripts.',
        to: '/continuous-delivery-gitops'
      },
      {
        id: 1,
        iconName: 'sub-socket',
        title: 'Continuous Integration',
        description: 'Up to 4X faster than other solutions.',
        to: '/continuous-integration'
      },
      {
        id: 2,
        iconName: 'sub-flag',
        title: 'Feature Flags',
        description: 'Optimize feature rollout velocity.',
        to: '/feature-flags'
      },
      {
        id: 3,
        iconName: 'sub-infra',
        title: 'Infrastructure as Code Management',
        description: 'Manage all your infrastructure.',
        to: '/infrastructure-as-code'
      },
      {
        id: 4,
        iconName: 'sub-chaos',
        title: 'Chaos Engineering',
        description: 'Validate service resilience.',
        to: '/chaos-engineering'
      },
      {
        id: 5,
        iconName: 'sub-reliability',
        title: 'Service Reliability Management',
        description: 'SLO configuration and service reliability.',
        to: '/service-reliability'
      }
    ]
  },
  {
    groupId: 1,
    title: 'Developer Experience',
    items: [
      {
        id: 6,
        iconName: 'sub-folder',
        title: 'Internal Developer Portal',
        description: 'Built for developers, onboard in minutes.',
        to: '/internal-developer-portal'
      },
      {
        id: 7,
        iconName: 'sub-repository',
        title: 'Code Repository',
        description: 'Integrated & familiar git experience.',
        to: '/code-repository'
      },
      {
        id: 8,
        iconName: 'sub-insights',
        title: 'Software Engineering Insights',
        description: 'Actionable insights on SDLC.',
        to: '/software-engineering-insights'
      }
    ]
  },
  {
    groupId: 2,
    title: 'Secure Software Delivery',
    items: [
      {
        id: 9,
        iconName: 'sub-chain',
        title: 'Software Supply Chain Assurance',
        description: 'Artifact integrity and governance.',
        to: '/software-supply-chain-assurance'
      },
      {
        id: 10,
        iconName: 'sub-shield',
        title: 'Security Testing Orchestration',
        description: 'Shift left security testing.',
        to: '/security-testing-orchestration'
      }
    ]
  },
  {
    groupId: 3,
    title: 'Cloud Cost Optimization',
    items: [
      {
        id: 11,
        iconName: 'sub-cloud',
        title: 'Cloud Cost Management',
        description: 'Intelligent cost management.',
        to: '/cloud-cost-management'
      }
    ]
  }
]
