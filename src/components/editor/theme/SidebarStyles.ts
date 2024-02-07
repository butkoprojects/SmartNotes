import { SystemStyleObject } from '@chakra-ui/react'

export const sidebarStyles: Record<string, SystemStyleObject> = {
    '.sidebar': {
        bgColor: "blackAlpha.50",
    },
    '.note-widget:hover': {
      bg: 'blackAlpha.200'
    }
  }

export const sidebarStylesDark: Record<string, SystemStyleObject> = {
    '.sidebar': {
        bgColor: "#2e3033",
    },
    '.note-widget:hover': {
      bg: 'whiteAlpha.100'
    }
  }