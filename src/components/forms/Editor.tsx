import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromHTML, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import ReactDraftWysiwyg from "src/@core/components/react-draft-wysiwyg";

const Editor = ({setValue, name= 'description', defaultValue}: any) => {
  const [data, setData] = useState(EditorState.createEmpty())
  useEffect(() => {
    if(defaultValue) {
      const blocksFromHTML: any = convertFromHTML(defaultValue);
      setData(EditorState.createWithContent(ContentState.createFromBlockArray(blocksFromHTML)));
    }
  }, [defaultValue])

  const onChange = (dataText: any) => {
    setData(dataText);
    const html = draftToHtml(convertToRaw(dataText.getCurrentContent()));
    setValue(name, html);
  }

  return <ReactDraftWysiwyg 
  editorState={data}
  onEditorStateChange={onChange} 
  toolbar={{
    // options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
    inline: { inDropdown: false },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
  }}
  />
}

export default Editor