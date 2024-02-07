import { SystemStyleObject } from '@chakra-ui/react'

export const tabStyles: Record<string, SystemStyleObject> = {
    '.tab': {
        bgColor: "white",
        'border-color': '#a7a7a7 !important',
    },
    'context-menu': {
      bgColor: "#2e3033 !important",
      textColor: "white"
    }
  }

export const tabStylesDark: Record<string, SystemStyleObject> = {
    '.tab': {
        bgColor: "#1E1F22",
    },
    'context-menu': {
      bgColor: "#2e3033 !important",
      textColor: "white"
    }
  }