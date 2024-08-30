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

//manage style for repeated use
const accordionContentStyle = 'w-full pl-0 pr-0 border-0 pb-0'
const specTitleStyle = 'text-ring flex-grow text-left -ml-1'

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
          <ul className="border-b" key={index}>
            <li className="py-2.5 inline-block w-1/2 " style={{ paddingLeft: `${level * 1 + 2}rem` }}>
              <Text size={2} weight="normal" className="text-ring">
                {item.name}
              </Text>
            </li>
            <li className="pr-2.5 py-2.5 inline-block w-1/2">
              <Text size={2} weight="normal" className="text-ring">
                {item.value}
              </Text>
            </li>
          </ul>
        )
      } else if (Array.isArray(item.value) || typeof item.value === 'object') {
        return (
          <Accordion
            type="single"
            key={index}
            className="border-0 last:border-b-0"
            defaultValue={item.name}
            collapsible>
            <AccordionItem value={item.name} className="border-0">
              <AccordionTrigger
                className="w-full pt-2 pb-2 pr-4 flex"
                leftChevron
                style={{ paddingLeft: `${level * 1 + 2}rem` }}>
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
              <Text size={2} weight="normal" className="text-ring">
                {item.name}
              </Text>
            </TableCell>
            <TableCell className="pt-2.5 w-1/2">
              <Text size={2} weight="normal" className="text-ring">
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
                  <AccordionTrigger className="w-full pt-2 pb-2 pl-4 flex pr-4 border-0" leftChevron>
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
              <Text size={2} weight="semibold" className="text-ring">
                {tableTitleName}
              </Text>
            </TableHead>
            <TableHead>
              <Text size={2} weight="semibold" className="text-ring">
                {tableTitleVal}
              </Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Todo: currently for the simple data, will add more accdordin sec with recursive data */}
          {Array.isArray(tableSpec) && renderTableRows(tableSpec)}
        </TableBody>
      </Table>
    </div>
  )
}
