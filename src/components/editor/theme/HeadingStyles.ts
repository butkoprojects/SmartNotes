import { SystemStyleObject } from '@chakra-ui/react'

export const headingStyles: Record<string, SystemStyleObject> = {
    '.editor-h1': {
        'font-size': '24px',
        'color': 'rgb(5, 5, 5)',
        'font-weight': '400',
        'margin': '0'
    },
    '.editor-h2': {
        'font-size': '15px',
        'color': 'rgb(101, 103, 107)',
        'font-weight': '700',
        'margin': '0',
        'text-transform': 'uppercase'
    },
    '.editor-h3': {
        'font-size': '12px',
        'margin': '0',
        'text-transform': 'uppercase'
    }
  }

export const headingStylesDark: Record<string, SystemStyleObject> = {
    '.editor-h1': {
        'font-size': '24px',
        'color': 'white',
        'font-weight': '400',
        'margin': '0'
    },
    '.editor-h2': {
        'font-size': '15px',
        'color': 'white',
        'font-weight': '700',
        'margin': '0',
        'text-transform': 'uppercase'
    },
    '.editor-h3': {
        'font-size': '12px',
        'margin': '0',
        'text-transform': 'uppercase'
    }
  }