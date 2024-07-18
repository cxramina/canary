import React from 'react'
import { PipelineStudio } from '../../components/PipelineStudio/PipelineStudio'
import { mockNodes } from './mock_single'
// import { mockNodes } from "./mock_many";
// import { mockNodes } from "./mock_multiple";
import { mockNodes as mockNodesParallel } from './mock_parallel'
import { mockNodes as mockNodesMixed } from './mock_mixed'
import { mockNodes as mockNodesDemo } from './mock_demo'

export const Studio: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodes as any }}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioParallel: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodesParallel as any }}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioMixed: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodesMixed as any }}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioDemo: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodesDemo as any }}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}
