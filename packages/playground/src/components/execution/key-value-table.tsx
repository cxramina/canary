import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
  Text,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@harnessio/canary'

type KeyValuePair = {
  name: string
  value: string | KeyValuePair[]
}

interface KeyValueTableProps {
  tableTitleName: string
  tableTitleVal: string
  className?: string
  tableSpec: KeyValuePair[]
}

//manage style for using repeatly
const accordionContentStyle = `w-full pl-1 pr-0 pb-0`
const specTitleStyle = 'flex-grow text-left text-studio-2'

export const KeyValueTable: React.FC<KeyValueTableProps> = ({
  className,
  tableTitleName,
  tableTitleVal,
  tableSpec
}) => {
  const renderListItems = (items: KeyValuePair[], level: number = 1) => {
    //detect if the listItems is objects or array, tailwind css will not generate
    const listItems = Array.isArray(items) ? items : [items]

    return listItems.map((item, index: number) => {
      if (typeof item.value === 'string') {
        return (
          <ul className="border-b flex flex-row align-middle" key={index} style={{ paddingLeft: `${level / 2}rem` }}>
            <li className="pr-2.5 py-2.5 w-1/2 text-studio-7" style={{ paddingLeft: `${level * 1 + 1}rem` }}>
              <Text size={2} weight="normal">
                {item.name}
              </Text>
            </li>
            <li className="pr-2.5 py-2.5 w-1/2 text-studio-7">
              <Text size={2} weight="normal">
                {item.value}
              </Text>
            </li>
          </ul>
        )
      } else if (Array.isArray(item.value) || typeof item.value === 'object') {
        return (
          <Accordion type="single" key={index} className="border-0" defaultValue={item.name} collapsible>
            <AccordionItem value={item.name} className="border-0">
              <AccordionTrigger
                className="w-full pt-2 pb-2 pr-4 flex gap-1"
                leftChevron
                style={{
                  paddingLeft: `${level * 1 + 1}rem`
                }}>
                <Text size={2} weight="normal" className={specTitleStyle}>
                  {item.name}
                </Text>
              </AccordionTrigger>
              <AccordionContent className={accordionContentStyle}>
                {renderListItems(item.value, level + 1)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      }
      return null
    })
  }

  const renderTableRows = (tableSpec: KeyValuePair[]) => {
    return tableSpec.map((item, index: number) => {
      if (typeof item.value === 'string') {
        return (
          <TableRow key={index} className="border-b">
            <TableCell className="pt-2.5 pl-4 w-1/2">
              <Text size={2} weight="normal" className="text-studio-7">
                {item.name}
              </Text>
            </TableCell>
            <TableCell className="pt-2.5 w-1/2">
              <Text size={2} weight="normal" className="text-studio-7">
                {item.value}
              </Text>
            </TableCell>
          </TableRow>
        )
      } else if (Array.isArray(item.value) || typeof item.value === 'object') {
        return (
          <TableRow key={index} className="border-0">
            <TableCell colSpan={2} className="p-0 border-0">
              <Accordion type="single" collapsible defaultValue={item.name}>
                <AccordionItem value={item.name} className="border-0">
                  <AccordionTrigger
                    className="w-full pt-2 pb-2 pl-4 flex pr-4 gap-1 data-[state=open]:border-b-0 data-[state=closed]:border-b"
                    leftChevron>
                    <Text size={2} weight="normal" className={specTitleStyle}>
                      {item.name}
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent className={accordionContentStyle}>{renderListItems(item.value)}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </TableCell>
          </TableRow>
        )
      }
      return null
    })
  }

  return (
    <div className="overflow-x-auto pt-4">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Text size={2} weight="semibold" className="text-primary">
                {tableTitleName}
              </Text>
            </TableHead>
            <TableHead>
              <Text size={2} weight="semibold" className="text-primary">
                {tableTitleVal}
              </Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{Array.isArray(tableSpec) && renderTableRows(tableSpec)}</TableBody>
      </Table>
    </div>
  )
}
