import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default class RichTextEditor extends Component {

    state = {
        editorState: BraftEditor.createEditorState(this.props.detail)
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }

    render () {
        const { editorState } = this.state
        return (
            <div className="my-component">
                <BraftEditor
                    style={{border:'1px solid lightGrey',width:'138%',height:'400px'}}
                    value={editorState}
                    onChange={this.handleEditorChange}
                />
            </div>
        )

    }

}