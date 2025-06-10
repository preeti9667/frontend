"use client";
import React, { useEffect, useState } from "react";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
  ContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Box, Typography } from "@mui/material";

interface MyEditorProps {
  value: string; // stringified raw JSON
  onChange: (value: string) => void;
}



const TextDraft: React.FC<MyEditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(() => {
    try {
      const parsed = JSON.parse(value);
      const content = convertFromRaw(parsed);
      return EditorState.createWithContent(content);
    } catch {
      return value
        ? EditorState.createWithContent(ContentState.createFromText(value))
        : EditorState.createEmpty();
    }
  });

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    // const raw = convertFromRaw(state.getCurrentContent().getPlainText());
    const raw = convertToRaw(state.getCurrentContent());

    onChange(JSON.stringify(raw));
  };

  useEffect(() => {
    try {
      // const parsed = JSON.parse(value);
      // const content = convertFromRaw(parsed);
      // setEditorState(EditorState.createWithContent(content));
    } catch {
      setEditorState(
        value
          ? EditorState.createWithContent(ContentState.createFromText(value))
          : EditorState.createEmpty()
      );
    }
  }, [value]);

  const handleBlockTypeToggle = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const buttonStyle = {
    border: "1px solid #aaa",
    background: "#f1f1f1",
    cursor: "pointer",
    padding: "4px 8px",
    marginRight: "6px",
    borderRadius: "4px",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "8px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          background: "#f9f9f9",
        }}
      >
        {/* Inline Styles */}
        {/* <button style={buttonStyle} onClick={() => handleInlineStyleToggle('BOLD')}>Bold</button>
        <button style={buttonStyle} onClick={() => handleInlineStyleToggle('ITALIC')}>Italic</button>
        <button style={buttonStyle} onClick={() => handleInlineStyleToggle('UNDERLINE')}>Underline</button> */}

        {/* Block Styles */}
        <button
          style={buttonStyle}
          onClick={() => handleBlockTypeToggle("header-one")}
        >
          H1
        </button>
        <button
          style={buttonStyle}
          onClick={() => handleBlockTypeToggle("header-two")}
        >
          H2
        </button>
        <button
          style={buttonStyle}
          onClick={() => handleBlockTypeToggle("header-three")}
        >
          H3
        </button>
        <button
          style={buttonStyle}
          onClick={() => handleBlockTypeToggle("unordered-list-item")}
        >
          UL
        </button>
        <button
          style={buttonStyle}
          onClick={() => handleBlockTypeToggle("ordered-list-item")}
        >
          OL
        </button>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          minHeight: "150px",
          padding: "10px",
          background: "#fff",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
};

export default TextDraft;

// interface formatDraftContentProps {
//   text: string
// }
//   export const formatDraftContent: React.FC<formatDraftContentProps> = (text: string) => {
//   const formatDraftContent1 = (rawString: string) => {
//     try {
//       const raw = JSON.parse(rawString);
//       const blocks = raw.blocks;
      
//       return (
//         <Box sx={{ padding: "0 10px 10px" }}>
//         {blocks.map((block: any, i: number) => {
//           // const styledContent = applyInlineStyles(block.text, block.inlineStyleRanges);
          
//           switch (block.type) {
//             case "header-one":
//               return (
//                 <Typography key={i} variant="h3">
//                   {/* {styledContent} */}
//                   {block.text}
//                 </Typography>
//               );
//               case "header-two":
//                 return (
//                   <Typography key={i} variant="h5">
//                   {block.text}
//                 </Typography>
//               );
//               case "header-three":
//                 return (
//                   <Typography key={i} variant="h6">
//                   {block.text}
//                 </Typography>
//               );
//               case "unordered-list-item":
//                 return (
//                   <Typography key={i} variant="body1">
//                   {block.text}
//                 </Typography>
//               );
//               default:
//                 return null;
//               }
//             })}
//       </Box>
//     );
//   } catch {
//     return <Typography variant="body1">{rawString}</Typography>;
//   }
// };  

// return(
//   <>
//   {formatDraftContent1(text)}
//   </>
// )
// }
