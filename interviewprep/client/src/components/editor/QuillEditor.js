import React from 'react';
import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true:false;

const QuillClipboard = Quill.import('modules/clipboard');

class Clipboard extends QuillClipboard{

    getMetaTagElements = (stringContent) => {
        const el = document.createElement('div');
        el.innerHTML = stringContent;
        return el.getElementByTagName('meta');
    };

    async onPaste(e){
        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = await clipboardData.getData('Text');

        const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) ||[];
        if(urlMatches.length > 0){
            e.preventDefault();
            urlMatches.forEach(link=>{
                axios.get(link)
                    .then(payload=>{
                        console.log(payload);
                        let title,image,url;
                        for(let node of this.getMetaTagElements(payload)){
                            if(node.getAttribute("property") === "og:title"){
                                title = node.getAttribute("content");
                            }
                            if(node.getAttribute("property") === "og:image"){
                                image = node.getAttribute("content");
                            }
                            if(node.getAttibute("property") === "og:url"){
                                url = node.getAttribute("content");
                            }
                        }

                          const rendered = `<a href=${url} target="_blank"><div><image src=${image} alt=${title} width="20%/><span>${title}</span><div></a>`;

                          let range = this.quill.getSelection();
                          let position = range ? range.index : 0;
                          this.quill.pasteHTML(position, rendered, "silent");
                          this.quill.setSelection(position + rendered.length);

                    })
                    .catch(error => console.error(error));
            });
        }else{
            super.onPaste(e);
        }
    }
}

Quill.register('modules/clipboard',Clipboard,true);

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed{
    static create(value){
        const imgTag = super.create();
        imgTag.setAttribute('src',value.src);
        imgTag.setAttribute('alt',value.alt);
        imgTag.setAttribute('width','100%');
        return imgTag;
    }

    static value(node){
        return {src :node.getAttribute('src'), alt:node.getAttribute('alt')};
    }
}


ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);



class VideoBlot extends BlockEmbed {
  static create(value) {
    if (value && value.src) {
      const videoTag = super.create();
      videoTag.setAttribute("src", value.src);
      videoTag.setAttribute("title", value.title);
      videoTag.setAttribute("width", "100%");
      videoTag.setAttribute("controls", "");

      return videoTag;
    } else {
      const iframeTag = document.createElement("iframe");
      iframeTag.setAttribute("src", value);
      iframeTag.setAttribute("frameborder", "0");
      iframeTag.setAttribute("allowfullscreen", true);
      iframeTag.setAttribute("width", "100%");

      return iframeTag;
    }
  }

  static value(node) {
      if(node.getAttribute('title')){
          return {src:node.getAttribute('src'),alt :node.getAttribute('title')};
      }else{
          return node.getAttribute('src');
      }
  }
}


VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);


class FileBlot extends BlockEmbed{
    static create(value){
        const prefixTag = document.createElement('span');
        prefixTag.innerText = "attachment";
        
        const bTag = document.createElement('b');

        bTag.innerText = value;

        const linkTag = document.createElement('a');
        linkTag.setAttribute('href',value);
        linkTag.setAttribute('target',"_blank");
        linkTag.setAttribute('className','file-link-inner-post');
        linkTag.appendChild(bTag);

        const node = super.create();
        node.appendChild(prefixTag);
        node.appendChild(linkTag);

        return node;
    }

    static value(node){
        const linkTag = node.querySelector('a');
        return linkTag.getAttribute('href');
    }
}

FileBlot.blotName = 'file';
FileBlot.tagName = 'p';
FileBlot.className = 'file-inner-post';
Quill.register(FileBlot);

class PollBlot extends BlockEmbed {

    static create(value){
        const prefixTag = document.createElement('span');
        prefixTag.innerText = 'ballot';

        const bTag = document.createElement('b');
        bTag.innerText = value.title;

        const node = super.create();
        node.setAttribute('id',value.id);
        node.appendChild(prefixTag);
        node.appendChild(bTag);

        return node;
    }

    static value(node){
        const id = node.getAttribute('id');
        const bTag = node.querySelector('b');
        const title = bTag.innerText;
        return {id,title};
    }
}

PollBlot.blotName = 'poll';
PollBlot.tagName = 'p';
PollBlot.className = 'poll-inner-post';
Quill.register(PollBlot);


class QuillEditor extends React.Component{

    bandID;
    placeholder;
    onEditorChange;
    onFilesChange;
    onPollsChange;
    _isMounted;

    constructor(props){
        super(props);

        this.state = {
            editorHtml : __ISMSIE__ ? "<p>&nbsp;</p>": "",
            files :[],

        };

        this.reactQuillRef = null;
        this.inputOpenImageRef = React.createRef();
        this.inputOpenVideoRef = React.createRef();
        this.inputOpenFileRef = React.createRef();

    }

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }


    handleChange = (html) =>{

        console.log('html',html);

        this.setState({
            editorHtml: html
        },()=>{
            this.props.onEditorChange(this.state.editorHtml);
        })
    };

    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    videoHandler = () =>{
        this.inputOpenVideoRef.current.click();
    };

    fileHandler = ()=>{
        this.inputOpenFileRef.current.click();
    }

    insertImage = (e)=>{
        e.stopPropagation();
        e.preventDefault();

        if(e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0){
            const file = e.currentTarget.files[0];

            let formData = new FormData();
            const config = {
                header : {'content-type' : 'multipart/form-data'}
            }

            formData.append('file',file);

            axios.post('/api/posts/uploadfiles',formData,config)
                .then(response =>{
                    if(response.data.success){
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();
                        let range = quill.getSelection();
                        let position = range ? range.index: 0;
                        quill.insertEmbed(position,'image',{src:`/${response.data.url}`,alt:response.data.fileName});
                        quill.setSelection(position+1);

                        if(this._isMounted){
                            this.setState({
                                files:[...this.state.files,file]
                            },()=>{this.props.onFilesChange(this.state.files)});
                        }else{
                            return alert('failed to upload file');
                        }
                    }
                })
        }
    };

    insertVideo = (e) =>{
        e.stopPropagation();
        e.preventDefault();

        if(e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0){
            const file = e.currentTarget.files[0];

            let formData = new FormData();

            const config = {
                header :{'content-type' : 'multipart/form-data'}
            }


            formData.append('file',file);

            axios.post('/api/posts/uploadfiles',formData,config)
                .then(res=>{
                    if(res.data.success){
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;

                        quill.insertEmbed(position,'video',{src:`/${res.data.url}` , title: res.data.fileName});
                        quill.setSelection(position+1);

                        if(this._isMounted){
                            this.setState({
                                files:[...this.state.files,file]
                            },()=>{this.props.onFilesChange(this.state.files)});
                        }else{
                            return alert('failed to upload file');
                        }
                    }
                })
        }
    }

    insertFile = (e)=>{
        e.stopPropagation();
        e.preventDefault();

        if(e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0){
            const file = e.currentTarget.files[0];
            console.log(file);

            let formData = new FormData();

            const config = {
                header : {'content-type':'multipart/form-data'}
            }

            formData.append('file',file);

            axios.post('/api/posts/uploadfiles',formData,config)
                .then(res=>{
                    if(res.data.success){
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position,'file',res.data.fileName);
                        quill.setSelection(position +1);

                        if(this._isMounted){
                            this.setState({
                                files :[ ...this.state.files,file]
                            },()=>{this.props.onFilesChange(this.state.files)});
                        }
                    }
                })
        }
    };

    render(){
        return (
          <div>
            <div id="toolbar">
              <select
                className="ql-header"
                defaultValue={" "}
                onChange={(e) => e.persist()}
              >
                <option value="1" />
                <option value="2" />
                <option value="" />
              </select>
              <button className="ql-blod" />
              <button className="ql-italic" />
              <button className="ql-underline" />
              <button className="ql-strike" />
              <button className="ql-insertImage">
                <i class="far fa-file-image" />
              </button>
              <button className="ql-insertVideo">
                <i class="fas fa-file-video"></i>
              </button>
              <button className="ql-insertFile">
                <i class="fas fa-file-pdf"></i>
              </button>
              <button className="ql-link" />
              <button className="ql-code-block" />
              <button className="ql-video" />
              <button className="ql-blockquote" />
              <button className="ql-clean" />
            </div>
            <ReactQuill
              ref={(el) => {
                this.reactQuillRef = el;
              }}
              theme={"snow"}
              onChange={this.handleChange}
              modules={this.modules}
              formats={this.formats}
              value={this.state.editorHtml}
              placeholder={this.props.placeholder}
            />
            <input
              type="file"
              accept="image/*"
              ref={this.inputOpenImageRef}
              style={{ display: "none" }}
              onChange={this.insertImage}
            />
            <input
              type="file"
              accept="video/*"
              ref={this.inputOpenVideoRef}
              style={{ display: "none" }}
              onChange={this.insertVideo}
            />
            <input
              type="file"
              accept="*"
              ref={this.inputOpenFileRef}
              style={{ display: "none" }}
              onChange={this.insertFile}
            />
          </div>
        );
    }

    modules = {
        syntax : true,
        toolbar : {
            container : "#toolbar",
            handlers :{
                insertImage : this.imageHandler,
                insertVideo : this.videoHandler,
                insertFile : this.fileHandler,
                insertPoll : this.pollHandler,
            }
        }
    };

    formats = [
        'header',
        'bold','italic','underline','strike',
        'image','video','file','link','code-block','video','blockquote','clean'
    ];
}

export default QuillEditor;
