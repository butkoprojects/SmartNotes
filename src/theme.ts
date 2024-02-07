import { extendTheme, ChakraTheme } from '@chakra-ui/react'
import tableStyles from './components/editor/theme/TableStyles'
import quoteStyles from './components/editor/theme/QuoteStyles'
import listStyles from './components/editor/theme/ListStyles'
import { codeStyles, codeStylesDark } from './components/editor/theme/CodeStyles'
import { mode } from '@chakra-ui/theme-tools';
import { textStyles, textStylesDark } from './components/editor/theme/TextStyles'
import { headingStyles, headingStylesDark } from './components/editor/theme/HeadingStyles'
import { headerStyles, headerStylesDark } from './components/editor/theme/HeaderStyles'
import { sidebarStyles, sidebarStylesDark } from './components/editor/theme/SidebarStyles'
import { navbarStyles, navbarStylesDark } from './components/editor/theme/NavbarStyles'
import { tabStyles, tabStylesDark } from './components/editor/theme/TabStyles'
import { footerStyles, footerStylesDark } from './components/editor/theme/FooterStyles'

// Editor Style


const styles: ChakraTheme['styles'] = {
  global: (props) => ({
    ...mode(textStyles, textStylesDark)(props),
    ...tableStyles,
    ...mode(codeStyles, codeStylesDark)(props),
    ...quoteStyles,
    ...mode(headingStyles, headingStylesDark)(props),
    ...listStyles,
    ...mode(headerStyles, headerStylesDark)(props),
    ...mode(sidebarStyles, sidebarStylesDark)(props),
    ...mode(navbarStyles, navbarStylesDark)(props),
    ...mode(tabStyles, tabStylesDark)(props),
    ...mode(footerStyles, footerStylesDark)(props),
  }),
}

export default extendTheme({ styles })
