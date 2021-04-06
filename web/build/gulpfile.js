const webpack= require('webpack');
const webpackConfig = require('./webpack.prod.js');
const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');

const accessKey = 'AFDOYE9-XAfxkC3a_vVQz0foa9l_WT6srOOgw-SE';
const secretKey = 'UhPMzIaU8mw8OoqZQeZsCWooBWxqR-eySnaBqoWd';
function getQnToken() {
    const putPolicy = new qiniu.rs.PutPolicy({ scope: '955ui' });
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}

async function defaultTask(cb) {
    console.log('任务开始执行');
    await new Promise((resolve)=>{
        webpack(webpackConfig, async (err,status)=>{
            // 获取dist目录 
            const outputDir = status.compilation.outputOptions.path;
            // 获取qiniu token
            const uploadToken = getQnToken();
            // 遍历文件目录
            let files = fs.readdirSync(outputDir);
            await Promise.all(files.map((item)=>{
                return new Promise((resolve2)=>{
                    // 文件地址
                    let fPath = path.join(outputDir,item);
                    // 校验文件
                    if(!(/(\.js|\.css)$/).test(fPath)) {
                        console.log('文件已过滤',item);
                        resolve2();
                        return;
                    }
                    // 获取文件
                    const file = fs.readFileSync(fPath);
                    // 上传文件
                    const formUploader = new qiniu.form_up.FormUploader();
                    const putExtra = new qiniu.form_up.PutExtra();
                    formUploader.put(uploadToken, item, file, putExtra, function(respErr,
                        respBody, respInfo) {
                        if (respErr) {
                            throw respErr;
                        }
                        if (respInfo.statusCode === 200) {
                            console.log('# 文件上传成功',item);
                            // 删除本地文件
                            fs.unlink(fPath,function(error){
                                if(error){
                                    console.log(error);
                                    return false;
                                }
                                console.log('# 删除文件成功', item);
                            })
                            resolve2(respBody);
                        } else {
                            console.log(respInfo.statusCode);
                            console.log(respBody);
                        }
                    });
                })
            }))
            resolve();
            console.log('打包完成');
        })
    });
    cb();
}
  
exports.default = defaultTask
