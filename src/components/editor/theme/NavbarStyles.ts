import { SystemStyleObject } from '@chakra-ui/react'

export const navbarStyles: Record<string, SystemStyleObject> = {
    '.navbar': {
        bgColor: "blackAlpha.50",
        'border-right': 'solid',
        'border-right-color': '#dddddd !important',
        'border-right-width': '1px !important'
    }
  }

export const navbarStylesDark: Record<string, SystemStyleObject> = {
    '.navbar': {
        bgColor: "#2e3033",
        'border-right': 'solid',
        'border-right-color': '#191919 !important',
        'border-right-width': '1px !important'
    }
  }