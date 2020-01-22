
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['bold', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
    ],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]


const New = () => {
    const [tags, setTags] = useState(['Tags', 'Input'])
    const divRef = useRef(null);

    //Tab
    const [tab, setTab] = useState(true)
  
  const removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);
    setTags( newTags );
  }

  const inputKeyDown = (e) => {
    const val = e.target.value
    if (e.keyCode === 13 && val && tags.length < 7) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags( [...tags, val] );
      divRef.current.value = null;
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    }
  }

    return (
      <React.Fragment>
        <div class="tabs_blog">
        <div class="tabs_box">

            
        <div class="tabs">

            <input type="radio" name="tabs" id="tabone" checked={tab ? true : false} onClick={() => setTab(true)} />
            <label for="tabone">テキスト</label>
            <div class="tab">
                <input type="text" placeholder="タイトル" />


                <div className="input-tag">

<ul className="input-tag__tags">
  { tags.map((tag, i) => (
    <li key={tag}>
      {tag}
      <span type="button" onClick={() => removeTag(i) }>&times;</span>
    </li>
  ))}
  <li className="input-tag__tags__input">
      { tags.length < 7 ? 
      <input type="text" onKeyDown={(e) => inputKeyDown(e)} ref={c => divRef.current = c} placeholder="タグを入力できます。" />
      : 'タグは最大で７個です'}
      </li>
</ul>
</div>


                <QuillNoSSRWrapper modules={modules} formats={formats}  />
                {/* <textarea name="" id="" cols="30" rows="10" placeholder="コンテンツ"></textarea> */}
                <button>SEND</button>
            </div>
            
            <input type="radio" name="tabs" id="tabtwo" checked={tab ? false : true} onClick={() => setTab(false)} />
            <label for="tabtwo">プレビュー</label>
            <div class="tab">
                <h1>Tab Two Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
        </div>


        </div>
      </React.Fragment>
    );
}

export default New