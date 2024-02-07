import { SystemStyleObject } from '@chakra-ui/react'

export const textStyles: Record<string, SystemStyleObject> = {
  '.editor-bold': {
    fontWeight: '700'
  },
  '.editor-italic': {
    fontStyle: 'italic',
  },
  '.editor-underline': {
    textDecoration: 'underline',
  },
  '.editor-link': {
    color: 'blue.500',
    _hover: {
      textDecoration: 'underline',
    },
  },
  '.editor-placeholder': {
    fontSize: '15px',
    color: '#999',
    overflow: 'hidden',
    position: 'absolute',
    top: '66px',
    left: '28px',
    right: '28px'
  }
}

export const textStylesDark: Record<string, SystemStyleObject> = {
  '.editor-bold': {
    fontWeight: '700'
  },
  '.editor-italic': {
    fontStyle: 'italic',
  },
  '.editor-underline': {
    textDecoration: 'underline',
  },
  '.editor-link': {
    color: 'blue.500',
    _hover: {
      textDecoration: 'underline',
    },
  },
  '.editor-placeholder': {
    fontSize: '15px',
    color: 'white',
    overflow: 'hidden',
    position: 'absolute',
    top: '66px',
    left: '28px',
    right: '28px'
  }
}
