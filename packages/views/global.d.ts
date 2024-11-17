declare module '*.yaml' {
  const value: Record<string, unknown>
  export default value
}

declare module 'monaco-editor/esm/vs/editor/common/services/languageFeatures.js' {
  export const ILanguageFeaturesService: { documentSymbolProvider: unknown }
}

declare module 'monaco-editor/esm/vs/editor/contrib/documentSymbols/browser/outlineModel.js' {
  import type { editor, languages } from 'monaco-editor'

  export abstract class OutlineModel {
    static create(registry: unknown, model: editor.ITextModel): Promise<OutlineModel>

    asListOfDocumentSymbols(): languages.DocumentSymbol[]
  }
}

declare module 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js' {
  export const StandaloneServices: {
    get: (id: unknown) => { documentSymbolProvider: unknown }
  }
}

// import en from './src/i18n/en'

// const resources = {
//   en
// } as const

// declare module './src/i18n/i18n' {
//   interface CustomTypeOptions {
//     resources: typeof resources
//     // returnNull: false;
//   }
// }
