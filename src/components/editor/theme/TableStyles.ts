import { SystemStyleObject } from '@chakra-ui/react'

const tableStyles: Record<string, SystemStyleObject> = {
  '.editor-table': {
    my: 2,
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
  },
  '.editor-table-cell': {
    textAlign: 'start',
    py: '6',
    px: '4',
    lineHeight: 5,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
  },
  '.editor-table-cell-header': {
    fontWeight: 'inherit',
  },
  '.editor-table-row': {
    borderColor: 'black',
    overflowWrap: 'break-word',
  },
}

export default tableStyles
