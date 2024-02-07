// Lexical
import { LexicalComposer as Composer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';

// Chakra UI
import { chakra, Stack, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'

// Plugins
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import TreeViewPlugin from './plugins/TreeViewPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import LinkModalPlugin from './plugins/LinkModalPlugin'
import TableModalPlugin from './plugins/TableModalPlugin'

// Components
import { theme } from './editorConfig'
import ControlButtons from './ControlButtons'
import { useEffect, useRef, useState } from 'react';
import CodeHighlightPlugin from './plugins/CodeHightlightPlugin';
import { EditorState } from 'lexical/LexicalEditorState';

import { AutoLinkNode, LinkNode } from '@lexical/link'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import {ListItemNode, ListNode} from '@lexical/list';
import {CodeHighlightNode, CodeNode} from '@lexical/code';

function Placeholder() {
  return <div className="editor-placeholder">Enter some text here</div>
}

const defaultState = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'

// @ts-ignore
const ContentEditChakra = chakra(ContentEditable)

type TextEditorProps = {
  initialEditorState: string | undefined,
  saveState: (state: EditorState) => void,
  id: string
}

export default function TextEditor(props: TextEditorProps) {
  const contextMenuHeight = 150;
  const {
    isOpen: isOpenLinkModal,
    onOpen: onOpenLinkModal,
    onClose: onCloseLinkModal,
  } = useDisclosure()
  const {
    isOpen: isOpenTableModal,
    onOpen: onOpenTableModal,
    onClose: onCloseTableModal,
  } = useDisclosure()

  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({x: 0, y: 0});
  const [isLeft, setIsLeft] = useState(true);
  const myElementRef = useRef(null);

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  function onChange(editorState: EditorState) {
    props.saveState(editorState);
  }

  return (
    <Composer initialConfig={{
      editorState: props.initialEditorState ? props.initialEditorState : defaultState,
      namespace: props.id.toString(),
      theme,
      // @ts-ignore
      onError(error) {
        throw error
      },
      nodes: [
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode
      ],
    }}>
        <ControlButtons
          onOpenLinkModal={onOpenLinkModal}
          onOpenTableModal={onOpenTableModal}
          x={points.x}
          y={points.y}
          clicked={clicked}
          id={props.id}
          isLeft={isLeft}
        />
        <chakra.div 
            w="100%" 
            className="editor-container" 
            onContextMenu={(e) => {
              setIsLeft(window.innerWidth / 2 > e.pageX - 200);
              // @ts-ignore
              const trueX = Math.abs(window.innerWidth - myElementRef?.current?.clientWidth - e.pageX) + 50;
              // @ts-ignore
              const trueY = window.innerHeight - e.pageY < contextMenuHeight ? e.pageY - contextMenuHeight : e.pageY;
              e.preventDefault();
              setClicked(true);
              setPoints({
                x: trueX,
                y: trueY,
              });
            }}
            ref={myElementRef}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditChakra
                w="100%"
                h="83vh"
                // maxH="70vh"
                overflowY="scroll"
                outline="0"
                border="none"
                p={2} />
            }
            placeholder={<Placeholder />} 
            ErrorBoundary={LexicalErrorBoundary}        
          />
        </chakra.div>
      <OnChangePlugin onChange={onChange} />
      {/* <TreeViewPlugin /> */}
      <CodeHighlightPlugin />
      <AutoLinkPlugin />
      <AutoFocusPlugin />
      <LinkPlugin />
      <TablePlugin />
      <ListPlugin />
      <CheckListPlugin />
      <LinkModalPlugin
        isOpenModal={isOpenLinkModal}
        onCloseModal={onCloseLinkModal}
      />
      <TableModalPlugin
        isOpenModal={isOpenTableModal}
        onCloseModal={onCloseTableModal}
      />
    </Composer>
  )
}
