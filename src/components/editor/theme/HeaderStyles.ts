import { SystemStyleObject } from '@chakra-ui/react'

export const headerStyles: Record<string, SystemStyleObject> = {
    '.header': {
        bgColor: "blackAlpha.50",
        'border-bottom': 'solid',
        'border-bottom-color': '#dddddd !important',
        'border-bottom-width': '1px !important'
    }
  }

export const headerStylesDark: Record<string, SystemStyleObject> = {
    '.header': {
        bgColor: "#2e3033",
        'border-bottom': 'solid',
        'border-bottom-color': '#191919 !important',
        'border-bottom-width': '1px !important'
    }
  }