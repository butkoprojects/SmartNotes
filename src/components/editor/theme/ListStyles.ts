import { SystemStyleObject } from '@chakra-ui/react'

const listStyles: Record<string, SystemStyleObject> = {
    '.editor-listItem': {
        'margin': '0 32px'
    },
    '.editor-listItemChecked': {
        'position': 'relative',
        'margin-left': '8px',
        'margin-right': '8px',
        'padding-left': '24px',
        'padding-right': '24px',
        'list-style-type': 'none',
        'outline': 'none'
    },
    '.editor-listItemUnchecked': {
        'position': 'relative',
        'margin-left': '8px',
        'margin-right': '8px',
        'padding-left': '24px',
        'padding-right': '24px',
        'list-style-type': 'none',
        'outline': 'none'
    },
    '.editor-nestedListItem':{
        'list-style-type': 'none'
    },
    '.editor-list-ol1': {
        'padding': '0',
        'margin': '0',
        'list-style-position': 'inside'
    },
    '.editor-list-ol2': {
        'padding': '0',
        'margin': '0',
        'list-style-type': 'upper-alpha',
        'list-style-position': 'inside'
    },
    '.editor-list-ol3': {
        'padding': '0',
        'margin': '0',
        'list-style-type': 'lower-alpha',
        'list-style-position': 'inside'
    },
    '.editor-list-ol4': {
        'padding': '0',
        'margin': '0',
        'list-style-type': 'upper-roman',
        'list-style-position': 'inside'
    },
    '.editor-list-ol5': {
        'padding': '0',
        'margin': '0',
        'list-style-type': 'lower-roman',
        'list-style-position': 'inside'
    },
    '.editor-list-ul': {
        'padding': '0',
        'margin': '0',
        'list-style-position': 'inside'
    }
  }
  
  export default listStyles