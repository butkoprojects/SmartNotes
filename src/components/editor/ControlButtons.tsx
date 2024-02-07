/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useState } from 'react'
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  LexicalEditor,
  INTERNAL_PointSelection,
  $createParagraphNode,
  $isRootOrShadowRoot,
  NodeKey,
} from 'lexical'
import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $setBlocksType,
} from '@lexical/selection';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType,
} from '@lexical/rich-text';
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  Button,
  ButtonGroup,
  IconButton,
  Icon,
  Stack,
  Spacer,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import { FiBold } from "react-icons/fi";
import { FiItalic } from "react-icons/fi";
import { FiUnderline } from "react-icons/fi";

// Helpers
import getSelectedNode from './helpers/getSelectedNode'

// Types
interface ControlButtonsProps {
  onOpenLinkModal: () => void
  onOpenTableModal: () => void
  x: number,
  y: number,
  clicked: boolean,
  id: string,
  isLeft: boolean 
}

const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
};

const rootTypeToRootName = {
  root: 'Root',
  table: 'Table',
};

function BlockFormatDropDown({
  editor,
  blockType,
  rootType,
  showSubMenu,
  openSubMenu,
  closeSubMenu,
  isLeft
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  showSubMenu: boolean;
  openSubMenu: () => void;
  closeSubMenu: () => void;
  isLeft: boolean
}): JSX.Element {
  const menuColor = useColorModeValue("white", "#2e3033")

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection() as INTERNAL_PointSelection;
      $setBlocksType(selection, () => $createParagraphNode());
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection() as INTERNAL_PointSelection;
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection() as INTERNAL_PointSelection;
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        let selection = $getSelection() as INTERNAL_PointSelection;
        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();

            selection.getNodes().forEach(node => node.remove());

            selection.insertNodes([codeNode]);
            selection = $getSelection() as INTERNAL_PointSelection;
            if ($isRangeSelection(selection))
              selection.insertRawText(textContent);

            selection.insertNodes([$createParagraphNode()]);  
          }
        }
      });
    }
  };

  const width = 150;

  return (
    <Box>
      <Box onMouseOver={() => openSubMenu()} m='6px'>
        {blockTypeToBlockName[blockType]}
      </Box>
      <Box 
        visibility={showSubMenu ? 'visible' : 'hidden'}
        position='absolute'
        ml={isLeft ? '180px' : width * -1}
        bottom='0px'
        p='10px'
        w={width}
        borderRadius='8px'
        zIndex="2"
        borderColor="inherit"
        bg={menuColor}
        boxShadow="0px 0px 2px 0px gray"
        onMouseOver={() => openSubMenu()}
        onMouseOut={() => closeSubMenu()}
      >
        <SubMenuItem onClick={formatParagraph} itemValue='Normal'/>
        <SubMenuItem onClick={() => formatHeading('h1')} itemValue='Heading 1'/>
        <SubMenuItem onClick={() => formatHeading('h2')} itemValue='Heading 2'/>
        <SubMenuItem onClick={() => formatHeading('h3')} itemValue='Heading 3'/>
        <SubMenuItem onClick={formatBulletList} itemValue='Bulleted List'/>
        <SubMenuItem onClick={formatNumberedList} itemValue='Numbered List'/>
        <SubMenuItem onClick={formatQuote} itemValue='Quote'/>
        <SubMenuItem onClick={formatCode} itemValue='Code Block'/>
      </Box>
    </Box>
  );
}

export default function ControlButtons(props: ControlButtonsProps) {
  const { onOpenLinkModal, onOpenTableModal } = props
  const [editor] = useLexicalComposerContext()
  const [isLink, setIsLink] = useState(false)
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph');
  const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>('root');
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const menuColor = useColorModeValue("white", "#2e3033")

  const handleCreateLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
      onOpenLinkModal()
    } else {
      onOpenLinkModal()
    }
  }, [editor, isLink, onOpenLinkModal])
  const handleCreateTable = () => {
    onOpenTableModal()
  }

  const ControlButtonsState = useCallback(() => {
    const selection = $getSelection()
    if (selection !== null && $isRangeSelection(selection)) {
      // Update links
      const node = getSelectedNode(selection)
      if (node !== null) {
        const parent = node.getParent()
        setIsLink($isLinkNode(parent) || $isLinkNode(node))
      }

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode === null 
          ? null
          : anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
              });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEditor])

  useEffect(
    () =>
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          ControlButtonsState()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
    [editor, ControlButtonsState]
  )
  useEffect(
    () =>
      mergeRegister(
        activeEditor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            ControlButtonsState()
          })
        })
      ),
    [activeEditor, ControlButtonsState]
  )

  const [showSubMenu, setShowSubMenu] = useState(false);

  const openSubMenu = () => {
    setShowSubMenu(true);
  }

  useEffect(() => setShowSubMenu(showSubMenu && props.clicked), [props.clicked]);

  const width = 200;
  return (
    <Box 
      display='flex'
      flexDir='column'
      position='absolute' 
      zIndex={1}
      top={props.y} 
      left={props.isLeft ? props.x : props.x - width} 
      p='10px'
      borderRadius='8px'
      borderColor="inherit"
      bg={menuColor}
      w={width}
      fontSize={'14px'}
      boxShadow="0px 0px 2px 0px gray"
      visibility={props.clicked ? 'visible': 'hidden'}
    >
      <Box>
        <BlockFormatDropDown
          blockType={blockType}
          rootType={rootType}
          editor={editor}
          showSubMenu={showSubMenu}
          openSubMenu={openSubMenu}
          closeSubMenu={() => setShowSubMenu(false)}
          isLeft={props.isLeft}
        />
      </Box>
      <Divider/>
      <Box onMouseOver={() => setShowSubMenu(false)}><SubMenuItem onClick={handleCreateLink} itemValue='Create Link'/></Box>
      <Box onMouseOver={() => setShowSubMenu(false)}><SubMenuItem onClick={handleCreateTable} itemValue='Create Table'/></Box>
      <Divider/>
      <ButtonGroup
        flexDir="row"
        justifyContent="center"
        onMouseOver={() => setShowSubMenu(false)}
        marginTop="6px"
      >
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
          aria-label=""
          size="sm"
          variant="ghost"
          icon={<FiBold />}
        />
        <IconButton
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
          aria-label=""
          size="sm"
          variant="ghost"
          icon={<FiItalic />}
        />
        <IconButton
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
          }
          aria-label=""
          size="sm"
          variant="ghost"
          icon={<FiUnderline />}
        />
      </ButtonGroup>
    </Box>
  )
}

const SubMenuItem = (
  {
    onClick,
    itemValue
  }: {
    onClick: () => void,
    itemValue: string
  }
) => {
  return <Box 
    _hover={{ bg: "blackAlpha.100", opacity: "70", borderRadius:'4px'}} 
    pl='6px'
    onClick={onClick}
    mt="6px"
    mb="6px"
  >{itemValue}</Box>
}