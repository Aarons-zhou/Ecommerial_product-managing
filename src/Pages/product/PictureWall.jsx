import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IMG_BASE } from '../../constances'
import { reqDeleteImage } from '../../api'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PictureWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    //增加和删除图片的回调
    handleChange = async ({ file, fileList }) => {
        if (file.status === 'done') {
            //进行图片的改名操作
            const result = file.response.data.name
            file.name = result
            console.log(file);
        } else if (file.status === 'removed') {
            //发送请求后台删除图片
            const result = await reqDeleteImage({ name: file.name })
            if (result.data.status === 0) message.success('图片删除成功')
            else message.error('图片删除失败，请刷新重试')
        }
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <>
                <Upload
                    action={`${IMG_BASE}manage/img/upload`}
                    name='image'
                    accept='image/*'
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}