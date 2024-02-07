import { SystemStyleObject } from '@chakra-ui/react'

export const codeStyles: Record<string, SystemStyleObject> = {
    '.editor-code': {
        bgColor: "gray.100",
        fontFamily: "Menlo, Consolas, Monaco, monospace",
        display: "block",
        padding: "8px 8px 8px 52px",
        'line-height': '1.53',
        'font-size': '13px',
        'margin': '0',
        'margin-top': '8px',
        'margin-bottom': '8px',
        'overflow-x': 'auto',
        'position': 'relative',
        'tab-size': '2'
    }
  }

export const codeStylesDark: Record<string, SystemStyleObject> = {
    '.editor-code': {
        bgColor: "gray.600",
        fontFamily: "Menlo, Consolas, Monaco, monospace",
        display: "block",
        padding: "8px 8px 8px 52px",
        'line-height': '1.53',
        'font-size': '13px',
        'margin': '0',
        'margin-top': '8px',
        'margin-bottom': '8px',
        'overflow-x': 'auto',
        'position': 'relative',
        'tab-size': '2'
    }
  }
