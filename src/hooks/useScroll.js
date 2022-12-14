import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'underscore'
// 传入回调方法
// export default function useScroll(reachBottom) {
//    监听window窗口滚动
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     console.log(clientHeight, scrollTop, scrollHeight)
//     if (clientHeight + scrollTop >= scrollHeight) {
//       if(reachBottom) reachBottom()
//     }
//   }

//   onMounted(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   })
//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollListenerHandler)
//   })
// }

export default function useScroll(elRef) {
  // 监听window或元素窗口滚动
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const scrollListenerHandler = throttle(() => {
    console.log('监听到滚动')
    if (el === window){
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    }else{
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log('到底部了')
      isReachBottom.value = true
    }
  },1000)

  onMounted(() => {
    if(elRef) { el = elRef.value }
    el.addEventListener('scroll', scrollListenerHandler)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
