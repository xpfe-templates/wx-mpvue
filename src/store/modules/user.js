/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-04-10 05:31:24
 * @modify date 2018-04-10 05:31:24
 * @desc [user]
 */

import wx from 'wx'
import fly from '@/api/request'
import urls from '@/api/urls'
import { appId } from '@/appConfig'
import { formatRes } from '@/utils/index'

const user = {
  state: {
    userDetail: {},
    contractStatus: -1, // -1=初始化，0=未签约，1=已签约
    verifyResult: {}
  },
  mutations: {
    SET_USER_DETAIL(state, data) {
      state.userDetail = data
    },
    SET_CONTRACT_STATUS(state, data) {
      state.contractStatus = data
    },
    SET_VERIFY_RESULT(state, data) {
      state.verifyResult = data
    }
  },
  actions: {
    // 登录
    WxLogin({ commit }, params) {
      return wx
        .login()
        .then(res => res.code)
        .then(code => {
          const data = { jsCode: code, appId }
          return fly.request(urls.wxLogin, data, { noToken: true })
        })
    },
    // 获取用户信息
    GetUserDetail({ commit }, params) {
      return fly
        .request(urls.userDetail)
        .then(res => {
          commit('SET_USER_DETAIL', res.value)
        })
        .catch(() => {
          commit('SET_USER_DETAIL', {
            nickName: '匿名',
            faceImgUrl: '/static/img/img-face-default.png'
          })
        })
    },
    // 上传人脸照片
    UploadImage({ dispatch, commit, state }, params) {
      return wx
        .chooseImage({
          count: 1,
          sizeType: ['compressed'], // 原图=original，压缩图=compressed
          sourceType: ['camera']
        })
        .then(res => {
          wx.showLoading({ title: '人脸认证中...' })
          return wx.uploadFile({
            url: urls.upload, // 服务器地址
            filePath: res.tempFilePaths[0],
            name: 'uploadFile'
          })
        })
        .then(jsonData => {
          try {
            let res = JSON.parse(jsonData.data)
            if (res.success) {
              res = formatRes(res)
              return dispatch('BindFace', res.value)
            }
            wx.hideLoading()
            return Promise.reject(res)
          } catch (err) {
            wx.hideLoading()
            const resultObj = {
              type: 'fail',
              faceImgUrl: state.verifyResult.faceImgUrl
            }
            commit('SET_VERIFY_RESULT', resultObj)
            return Promise.reject({ codeDesc: '上传图片解析出错' })
          }
        })
        .catch(err => {
          err = formatRes(err)
          wx.hideLoading()
          const resultObj = {
            type: 'fail',
            faceImgUrl: state.verifyResult.faceImgUrl
          }
          commit('SET_VERIFY_RESULT', resultObj)
          return Promise.reject(err)
        })
    },
    // 绑定人脸
    BindFace({ state, commit }, url) {
      return fly
        .request(urls.bindFace, { imgUrl: url })
        .then(res => {
          wx.setStorageSync('status', 3)
          state.userDetail.faceImgUrl = url
          const resultObj = {
            type: 'success',
            faceImgUrl: url
          }
          commit('SET_VERIFY_RESULT', resultObj)
          commit('SET_USER_DETAIL', state.userDetail)
          wx.hideLoading()
          return res
        })
        .catch(err => {
          wx.hideLoading()
          const resultObj = {
            type: 'fail',
            faceImgUrl: url
          }
          commit('SET_VERIFY_RESULT', resultObj)
          return Promise.reject(err)
        })
    },
    // 自动绑脸，取消wx相关函数
    AutoBindFace({ state, commit }, url) {
      return fly
        .request(urls.bindFace, { imgUrl: url })
        .then(res => {
          wx.setStorageSync('status', 3)
          state.userDetail.faceImgUrl = url
          const resultObj = {
            type: 'success',
            typeCls: 'is-success',
            faceImgUrl: url
          }
          commit('SET_VERIFY_RESULT', resultObj)
          commit('SET_USER_DETAIL', state.userDetail)
          return res
        })
        .catch(err => {
          const resultObj = {
            type: 'fail',
            typeCls: 'is-fail',
            faceImgUrl: url
          }
          commit('SET_VERIFY_RESULT', resultObj)
          return Promise.reject(err)
        })
    },
    // 获取免密签约状态
    GetContractStatus({ state, commit }, params) {
      return fly.request(urls.contractStatus).then(res => {
        const status = +res.value.status
        commit('SET_CONTRACT_STATUS', status)
        return res
      })
    },
    // 解约
    DismissContract({ commit }, params) {
      params = Object.assign({}, params, { contractTerminationRemark: '用户解约' })
      return fly
        .request(urls.dimissContract, params)
        .then(res => {
          commit('SET_CONTRACT_STATUS', 0)
          return res
        })
        .catch(err => {
          wx.showModal({
            title: '提示',
            content: err.codeDesc || '解约失败，请稍后重试',
            showCancel: false
          })
        })
    },
    // 签约
    SignContract({ state, commit }, params) {
      params = Object.assign({}, params, {
        contractDisplayAccount: state.userDetail.nickName,
        creId: '',
        phone: ''
      })
      return fly.request(urls.signContract, params)
    },
    // 发送短信
    SendSMS({ commit }, params) {
      return fly.request(urls.sendSMS, params)
    },
    // 添加用户信息
    AddUserInfo({ commit }, params) {
      return fly.request(urls.addUser, params)
    },
    // 添加用户信息
    AddPhone({ commit }, params) {
      return fly.request(urls.addPhone, params)
    }
  }
}

export default user
