import React from 'react';
import TinyMCE from 'react-tinymce';

class Editor extends React.PureComponent {
    handleEditorChange = (e) => {
        this.props.getCon(e.target.getContent());
    };

    render() {
        return (
            <TinyMCE
                content={this.props.content}
                config={{
                    menubar: false,
                    toolbar: 'undo redo | fontselect | fontsizeselect | bold italic underline' +
                    ' | forecolor backcolor | alignleft aligncenter alignright alignjustify' +
                    ' | outdent indent | bdesk_photo link styleselect',
                    statusbar: false,
                    plugins: 'paste deskphoto link textcolor lists',
                    height: 600,
                    default_link_target: '_blank',
                    paste_data_images: true,
                    automatic_uploads: false,
                    language: 'zh_CN',
                    font_formats: 'Arial=arial,helvetica,sans-serif;' +
                    'Arial Black=arial black,avant garde;' +
                    'Times New Roman=times new roman,times;' +
                    'Courier New=courier new,courier;' +
                    'Tahoma=tahoma,arial,helvetica,sans-serif;' +
                    'Verdana=verdana,geneva;' +
                    '宋体=SimSun;' +
                    '新宋体=NSimSun;' +
                    '黑体=SimHei;' +
                    '微软雅黑=Microsoft YaHei',
                    content_css: '/tinymce/js/MceContent.css',
                    fontsize_formats: '12pt 14pt 18pt 24pt 36pt',
                    images_upload_handler: (blobInfo, success, failure) => {
                        // 图片上传方法
                        var xhr,
                            formData;

                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open('POST', '/api/uploadImg');

                        xhr.onload = () => {
                            var json;
                            if (xhr.status !== 200) {
                                failure(`HTTP Error: ${xhr.status}`);
                                return;
                            }
                            json = JSON.parse(xhr.responseText);
                            if (!json || typeof json.data.imgUrl !== 'string') {
                                failure(`Invalid JSON: ${xhr.responseText}`);
                                return;
                            }
                            // 成功后将服务器图片地址替换源 src 中地址
                            success(json.data.imgUrl);
                        };
                        formData = new FormData();
                        formData.append('img', blobInfo.blob(), blobInfo.filename());
                        xhr.send(formData);
                    },
                }}
                onChange={this.handleEditorChange}
            />
        );
    }
}
export default Editor;

