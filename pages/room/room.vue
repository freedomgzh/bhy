<template>
	<view class="page-room">
	  <!-- <trtc-room id="trtc-component" config="{{rtcConfig}}"> </trtc-room> -->
	  <view class="tip-toast" v-if="showTipToast">
	    <view>当前房间为1v1双人通话房间</view>
	    <view>不希望其他人打扰</view>
	  </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				rtcConfig: {
				  sdkAppID: '', // 必要参数 开通实时音视频服务创建应用后分配的 sdkAppID
				  userID: '', // 必要参数 用户 ID 可以由您的帐号系统指定
				  userSig: '', // 必要参数 身份签名，相当于登录密码的作用
				  template: '', // 必要参数 组件模版，支持的值 1v1 grid custom ，注意：不支持动态修改, iOS 不支持 pusher 动态渲染
				},
				showTipToast: false,
				subscribeList: {},
			}
		},
		methods:{
			enterRoom: function(params) {
			  params.template = params.template || '1v1'
			  params.roomID = params.roomID || this.randomRoomID()
			  params.userID = params.userID || this.randomUserID()
			  console.log('* room enterRoom', params)
			
			  const Signature = genTestUserSig(params.userID)
			  params.sdkAppID = Signature.sdkAppID
			  params.userSig = Signature.userSig
			
			  this.template = params.template
			  if (params.template === 'grid') {
			    this.rtcConfig = {
			      sdkAppID: params.sdkAppID, // 您的实时音视频服务创建应用后分配的 sdkAppID
			      userID: params.userID,
			      userSig: params.userSig,
			      template: params.template, // 1v1 grid custom
			      debugMode: params.debugMode, // 非必要参数，打开组件的调试模式，开发调试时建议设置为 true
			      frontCamera: params.frontCamera,
			      enableEarMonitor: params.enableEarMonitor,
			      enableAutoFocus: params.enableAutoFocus,
			      localMirror: params.localMirror,
			      enableAgc: params.enableAgc,
			      enableAns: params.enableAns,
			      videoWidth: params.videoWidth,
			      videoHeight: params.videoHeight,
			      maxBitrate: params.maxBitrate,
			      minBitrate: params.minBitrate,
			      beautyLevel: 9, // 开启美颜等级 0～9级美颜
			      enableIM: false, // 可选，仅支持初始化设置（进房前设置），不支持动态修改
			      audioVolumeType: params.audioVolumeType,
			      audioQuality: params.audioQuality,
			
			      // pusher URL 参数
			      scene: params.scene, // rtc live
			      encsmall: params.encsmall ? 1 : 0,
			      cloudenv: params.cloudenv,
			      enableBlackStream: params.enableBlackStream,
			      streamID: params.streamID,
			      userDefineRecordID: params.userDefineRecordID,
			      privateMapKey: params.privateMapKey,
			      pureAudioMode: params.pureAudioMode,
			      recvMode: params.recvMode,
			    }
			  } else {
			    this.rtcConfig = {
			      sdkAppID: params.sdkAppID, // 您的实时音视频服务创建应用后分配的 sdkAppID
			      userID: params.userID,
			      userSig: params.userSig,
			      template: params.template, // 1v1 grid custom
			      debugMode: params.debugMode, // 非必要参数，打开组件的调试模式，开发调试时建议设置为 true
			      beautyLevel: 9, // 默认开启美颜
			      enableIM: false, // 可选，仅支持初始化设置（进房前设置），不支持动态修改
			      audioVolumeType: params.audioVolumeType,
			    }
			  }
			
			  this.setData({
			    rtcConfig: this.rtcConfig,
			  }, () => {
			    // roomID 取值范围 1 ~ 4294967295
			    this.trtcComponent.enterRoom({ roomID: params.roomID }).then(()=>{
			      if (this.template === 'custom') {
			        // 设置推流端视窗的坐标和尺寸
			        this.trtcComponent.setViewRect({
			          userID: params.userID,
			          xAxis: '480rpx',
			          yAxis: '160rpx',
			          width: '240rpx',
			          height: '320rpx',
			        })
			      }
			    }).catch((res)=>{
			      console.error('* room joinRoom 进房失败:', res)
			    })
			  })
			},
			bindTRTCRoomEvent: function() {
			  const TRTC_EVENT = this.trtcComponent.EVENT
			  this.timestamp = []
			  // 初始化事件订阅
			  this.trtcComponent.on(TRTC_EVENT.LOCAL_JOIN, (event)=>{
			    console.log('* room LOCAL_JOIN', event)
			    // 进房成功，触发该事件后可以对本地视频和音频进行设置
			    if (this.options.localVideo === true || this.options.template === '1v1') {
			      this.trtcComponent.publishLocalVideo()
			    }
			    if (this.options.localAudio === true || this.options.template === '1v1') {
			      this.trtcComponent.publishLocalAudio()
			    }
			    if (this.options.template === 'custom') {
			      this.trtcComponent.setViewRect({
			        userID: event.userID,
			        xAxis: '0rpx',
			        yAxis: '0rpx',
			        width: '240rpx',
			        height: '320rpx',
			      })
			    }
			  })
			  this.trtcComponent.on(TRTC_EVENT.LOCAL_LEAVE, (event)=>{
			    console.log('* room LOCAL_LEAVE', event)
			  })
			  this.trtcComponent.on(TRTC_EVENT.ERROR, (event)=>{
			    console.log('* room ERROR', event)
			  })
			  // 远端用户进房
			  this.trtcComponent.on(TRTC_EVENT.REMOTE_USER_JOIN, (event)=>{
			    console.log('* room REMOTE_USER_JOIN', event, this.trtcComponent.getRemoteUserList())
			    this.timestamp.push(new Date())
			    // 1v1视频通话时限制人数为两人的简易逻辑，建议通过后端实现房间人数管理
			    // 2人以上同时进行通话请选择网格布局
			    if (this.template === '1v1' && this.timestamp.length > 1) {
			      const interval = this.timestamp[1] - this.timestamp[0]
			      if (interval < 1000) {
			        // 房间里已经有两个人
			        this.setData({
			          showTipToast: true,
			        }, () => {
			          setTimeout(()=>{
			            this.setData({
			              showTipToast: false,
			            })
			            wx.navigateBack({
			              delta: 1,
			            })
			          }, 4000)
			        })
			      }
			    }
			  })
			  // 远端用户退出
			  this.trtcComponent.on(TRTC_EVENT.REMOTE_USER_LEAVE, (event)=>{
			    console.log('* room REMOTE_USER_LEAVE', event, this.trtcComponent.getRemoteUserList())
			    if (this.template === '1v1') {
			      this.timestamp = []
			    }
			    if (this.template === '1v1' && this.remoteUser === event.data.userID) {
			      this.remoteUser = null
			    }
			  })
			  // 远端用户推送视频
			  this.trtcComponent.on(TRTC_EVENT.REMOTE_VIDEO_ADD, (event)=>{
			    console.log('* room REMOTE_VIDEO_ADD', event, this.trtcComponent.getRemoteUserList())
			    // 订阅视频
			    const userList = this.trtcComponent.getRemoteUserList()
			    const data = event.data
			    if (this.template === '1v1' && (!this.remoteUser || this.remoteUser === data.userID)) {
			      // 1v1 只订阅第一个远端流
			      this.remoteUser = data.userID
			      this.trtcComponent.subscribeRemoteVideo({
			        userID: data.userID,
			        streamType: data.streamType,
			      })
			    } else {
			      // if (!this.subscribeList[data.userID + '-video']) {
			      this.trtcComponent.subscribeRemoteVideo({
			        userID: data.userID,
			        streamType: data.streamType,
			      })
			      // 标记该用户已首次订阅过
			      this.subscribeList[data.userID + '-video'] = true
			      // }
			    }
			    if (this.template === 'custom' && data.userID && data.streamType) {
			      let index = userList.findIndex((item)=>{
			        return item.userID === data.userID
			      })
			      index++
			      const y = 320 * index + 160
			      // 设置远端视图坐标和尺寸
			      this.trtcComponent.setViewRect({
			        userID: data.userID,
			        streamType: data.streamType,
			        xAxis: '480rpx',
			        yAxis: y + 'rpx',
			        width: '240rpx',
			        height: '320rpx',
			      })
			    }
			  })
			  // 远端用户取消推送视频
			  this.trtcComponent.on(TRTC_EVENT.REMOTE_VIDEO_REMOVE, (event)=>{
			    console.log('* room REMOTE_VIDEO_REMOVE', event, this.trtcComponent.getRemoteUserList())
			  })
			  // 远端用户推送音频
			  this.trtcComponent.on(TRTC_EVENT.REMOTE_AUDIO_ADD, (event)=>{
			    console.log('* room REMOTE_AUDIO_ADD', event, this.trtcComponent.getRemoteUserList())
			    // 订阅音频
			    const data = event.data
			    if (this.template === '1v1' && (!this.remoteUser || this.remoteUser === data.userID)) {
			      this.remoteUser = data.userID
			      this.trtcComponent.subscribeRemoteAudio({ userID: data.userID })
			    } else {
			      // if (!this.subscribeList[data.userID + '-audio']) {
			      this.trtcComponent.subscribeRemoteAudio({
			        userID: data.userID,
			      })
			      // 标记该用户已首次订阅过
			      this.subscribeList[data.userID + '-audio'] = true
			      // }
			    }
			  })
			  // 远端用户取消推送音频
			  this.trtcComponent.on(TRTC_EVENT.REMOTE_AUDIO_REMOVE, (event)=>{
			    console.log('* room REMOTE_AUDIO_REMOVE', event, this.trtcComponent.getRemoteUserList())
			  })
			  // this.trtcComponent.on(TRTC_EVENT.LOCAL_NET_STATE_UPDATE, (event)=>{
			  //   console.log('* room LOCAL_NET_STATE_UPDATE', event)
			  // })
			  // this.trtcComponent.on(TRTC_EVENT.REMOTE_NET_STATE_UPDATE, (event)=>{
			  //   console.log('* room REMOTE_NET_STATE_UPDATE', event)
			  // })
			  this.trtcComponent.on(TRTC_EVENT.IM_READY, (event)=>{
			    console.log('* room IM_READY', event)
			  })
			  this.trtcComponent.on(TRTC_EVENT.IM_MESSAGE_RECEIVED, (event)=>{
			    console.log('* room IM_MESSAGE_RECEIVED', event)
			  })
			},
			randomUserID: function() {
			  return new Date().getTime().toString(16).split('').reverse().join('')
			},
			randomRoomID: function() {
			  return parseInt(Math.random() * 9999)
			},
		}
		
	}
</script>

<style>
	/* miniprogram/pages/room/room.wxss */
	.page-room{
	  width: 100vw;
	  height: 100vh;
	  overflow: hidden;
	}
	.tip-toast {
	  position: absolute;
	  top: 40vh;
	  width: 70vw;
	  left: 15vw;
	  border-radius: 12rpx;
	  height: 20vh;
	  background: rgba(0,0,0,0.8);
	  color: white;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	
	}
	.tip-toast view {
	  padding: 20rpx 0;
	  font-size: 32rpx;
	}
</style>
