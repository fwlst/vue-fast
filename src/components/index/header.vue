<template>
    <div class="header">
        <div class="head_pic">
            <img :src="userInfo.head_pic">
            <input class="upload" type="file" accept="image" @change="upload">
        </div>
        <div class="head_info">
            <div class="info_left">
                <div class="nickname">{{userInfo.nickname}}</div>
                <div class="info_group">
                    <div class="balance">余额：{{userInfo.balance}}元</div>
                    <div class="integral">积分：{{userInfo.integral}}</div>
                </div>
            </div>
            <div class="info_right">
                <div class="city">
                    <span class="icon-location"></span>{{userInfo.city}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import API from '@/API/axios'
    import Exif from 'exif-js'
    export default {
        name: '',
        data () {
            return {
                userInfo: {},
                headerImage:'',
                picValue:''
            }
        },
        methods: {
            getUserInfo(){
                let token = localStorage.getItem('token'),
                    postData = {
                        token: token
                    };
                API.getUserInfo(postData).then(({data})=>{
                    if(data.code === 200){
                        this.userInfo = data.data;
                    }else {
                        this.$toast(data.msg);
                    }
                })
            },
            updateHeadPic(){
                let token = localStorage.getItem('token'),
                    postData = {
                        token: token,
                        head_pic: this.headerImage
                    };
                API.updateHeadPic(postData).then(({data})=>{
                    if(data.code === 200){
                        this.userInfo.head_pic = this.headerImage;
                    }else {
                        this.$toast(data.msg);
                    }
                })
            },
            upload (e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.picValue = files[0];
                this.imgPreview(this.picValue);
            },
            imgPreview (file) {
                let self = this;
                let Orientation;
                //去获取拍照时的信息，解决拍出来的照片旋转问题
                Exif.getData(file, function(){
                    Orientation = Exif.getTag(this, 'Orientation');
                });
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;

                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    let reader = new FileReader();
                    // 将图片2将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        let result = this.result;
                        let img = new Image();
                        img.src = result;
                        //判断图片是否大于100K,是就直接上传，反之压缩图片
                        if (this.result.length <= (100 * 1024)) {
                            self.headerImage = this.result;
                            self.postImg();
                        }else {
                            img.onload = function () {
                                let data = self.compress(img,Orientation);
                                self.headerImage = data;
                                self.postImg();
                            }
                        }
                    }
                }
            },
            postImg () {
                //这里写接口
                this.updateHeadPic();
            },
            rotateImg (img, direction,canvas) {
                //最小与最大旋转方向，图片旋转4次后回到原方向
                const min_step = 0;
                const max_step = 3;
                if (img === null)return;
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height;
                let width = img.width;
                let step = 2;
                if (step === null) {
                    step = min_step;
                }
                if (direction == 'right') {
                    step++;
                    //旋转到原位置，即超过最大值
                    step > max_step && (step = min_step);
                } else {
                    step--;
                    step < min_step && (step = max_step);
                }
                //旋转角度以弧度值为参数
                let degree = step * 90 * Math.PI / 180;
                let ctx = canvas.getContext('2d');
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0);
                        break;
                }
            },
            compress(img,Orientation) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                //瓦片canvas
                let tCanvas = document.createElement("canvas");
                let tctx = tCanvas.getContext("2d");
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio;
                if ((ratio = width * height / 4000000) > 1) {
                    console.log("大于400万像素")
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //        铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //如果图片像素大于100万则使用瓦片绘制
                let count;
                if ((count = width * height / 1000000) > 1) {
                    console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                    //            计算每块瓦片的宽和高
                    let nw = ~~(width / count);
                    let nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //修复ios上传图片的时候 被旋转的问题
                if(Orientation != "" && Orientation != 1){
                    switch(Orientation){
                        case 6://需要顺时针（向左）90度旋转
                            this.rotateImg(img,'left',canvas);
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            this.rotateImg(img,'right',canvas);
                            break;
                        case 3://需要180度旋转
                            this.rotateImg(img,'right',canvas);//转两次
                            this.rotateImg(img,'right',canvas);
                            break;
                    }
                }
                //进行最小压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.1);
                console.log('压缩前：' + initSize);
                console.log('压缩后：' + ndata.length);
                console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;
            },
        },
        mounted () { // 代替ready
            this.getUserInfo()
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
    .header{
        background: #ffdc00;
        padding: 15px 10px;
        height: 60px;
        display: flex;
        .head_pic{
            position: relative;
            flex: 60px 0 0;
            img{
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 100%;
            }
            .upload{
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
        .head_info{
            flex: 1;
            display: flex;
            .info_left{
                flex: 1;
                padding: 8px 0 8px 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .nickname{
                    font-weight: bold;
                }
                .info_group{
                    font-size: 14px;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    .balance{
                        width: 53%;
                    }
                    .integral{
                        width: 45%;
                    }
                }
            }
            .info_right{
                flex: 70px 0 0;
                font-size: 14px;
                font-weight: bold;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                padding-bottom: 8px;
            }
        }
    }
</style>
